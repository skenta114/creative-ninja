'use client'
import { useEffect, useState } from 'react'
import { supabase } from "@/utils/supabaseClient"
import GoogleMap from 'google-maps-react-markers'
// import { Marker } from 'google-maps-react-markers'
import dotenv from 'dotenv';
dotenv.config();

const public_url = "https://ypiitqzrcwvannvqfhew.supabase.co/storage/v1/object/public/picturs/img/";
const IndexPage = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [urlList, setUrlList] = useState<Array<object>>([])

  
  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        }, (error) => {
          console.error('Error getting current position:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const timerId = setTimeout(getCurrentPosition, 2000); // 2秒後に位置情報を取得する

    return () => clearTimeout(timerId); // コンポーネントがアンマウントされたときにタイマーをクリアする
  }, []);

  function getExifData(imageBlob) {
    return new Promise((resolve, reject) => {
      EXIF.getData(imageBlob, function() {
        const lat = EXIF.getTag(this, "GPSLatitude");
        const lon = EXIF.getTag(this, "GPSLongitude");
  
        if (lat && lon) {
          const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
          const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "E";
  
          const latFinal = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef === "N" ? 1 : -1);
          const lonFinal = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef === "E" ? 1 : -1);
  
          resolve({ lat: latFinal, lon: lonFinal });
        } else {
          resolve(null)
        }
      });
    });
  }

  // 画像一覧を取得
  useEffect(() => {
    const listAllImage = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('picturs')
          .list("img", {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
          });
  
        if (error) {
          console.error("Error fetching images:", error.message);
          return;
        }
  
        const tempUrlList: string[] = data
          .filter(item => item.name !== ".emptyFolderPlaceholder")
          .map(item => item.name);
        const resultUrlList = []
        for(const url of tempUrlList) {
          try {
            const response = await fetch(public_url + url);
            const imageBlob = await response.blob();
            // 経度緯度情報を取得
            const location = await getExifData(imageBlob)
            console.log('location', location)
            if(location && location.lat && location.lon) {
              resultUrlList.push({url, lat: location.lat, lng: location.lon})
            }
          } catch(e) {
            console.log(e)
            continue
          }
          
        }
        // 返す
        setUrlList(resultUrlList);
      } finally {

      }
    };
    listAllImage()
  }, []);


  console.log(urlList)
  return (
    <div>
      <h1>Real-time Geolocation Example</h1>
      <div>
        <h1>Map Area</h1>
        {coordinates ? <SimpleMap 
          lat={coordinates.latitude}
          lng={coordinates.longitude}
          urlList={urlList}
        /> : null}
      </div>
      <div>
        <h1>Images Area</h1>
        {urlList.map(url => (
          <img src={public_url + url.url} />
        ))}
      </div>
      {coordinates !== null && (
        <p>
          現在の緯度: {coordinates.latitude}, 現在の経度: {coordinates.longitude}
        </p>
      )}
    </div>
  );
};

export default IndexPage;

// const AnyReactComponent = ({ text }) => <div style={{
//   color: 'white',
//   background: 'red',
//   padding: '15px 10px',
//   display: 'inline-flex',
//   textAlign: 'center',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '100%',
//   transform: 'translate(-50%, -50%)'
// }}
// >
//   {text}
// </div>

// lat, lng = 現在地
// urlList = [{lat, lng, url}]
const SimpleMap = ({lat, lng, urlList}) => {
  const defaultProperties = {
    center: {
      lat,
      lng
    },
    zoom: 11
    };
    console.log(urlList)

  return (
    // コンテナの高さは必須
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        // APIキーの設定が必要です
        apiKey={process.env.GOOGLEMAP_API_KEY || ''}
        defaultCenter={defaultProperties.center}
        defaultZoom={defaultProperties.zoom}
      >
        {urlList.map((urlObject, index) => (
            <div
                key={index}
                lat={urlObject.lat}
                lng={urlObject.lng}
            >My Marker</div>
        ))}
      </GoogleMap>
    </div>
  );
}
