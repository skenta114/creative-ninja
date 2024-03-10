"use client";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { supabase } from "@/utils/supabaseClient";
import dotenv from "dotenv";
import * as EXIF from "exif-js";
import { useAuth } from "@/utils/auth";
dotenv.config();

const public_url =
  "https://ypiitqzrcwvannvqfhew.supabase.co/storage/v1/object/public/picturs/img/";
const containerStyle = {
  height: "100vh",
  width: "100%",
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

const divStyle = {
  background: "white",
  fontSize: 7.5,
};

const MyComponent = () => {
  const x = useAuth();
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [urlList, setUrlList] = useState<Array<object>>([]);
  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    const timerId = setTimeout(getCurrentPosition, 2000); // 2秒後に位置情報を取得する
    return () => clearTimeout(timerId); // コンポーネントがアンマウントされたときにタイマーをクリアする
  }, []);
  function getExifData(imageBlob) {
    return new Promise((resolve, reject) => {
      EXIF.getData(imageBlob, function () {
        const lat = EXIF.getTag(this, "GPSLatitude");
        const lon = EXIF.getTag(this, "GPSLongitude");

        if (lat && lon) {
          const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
          const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "E";

          const latFinal =
            (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "N" ? 1 : -1);
          const lonFinal =
            (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === "E" ? 1 : -1);

          resolve({ lat: latFinal, lon: lonFinal });
        } else {
          resolve(null);
        }
      });
    });
  }
  // 画像一覧を取得
  useEffect(() => {
    const listAllImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("picturs")
          .list("img", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
          });
        if (error) {
          console.error("Error fetching images:", error.message);
          return;
        }

        const tempUrlList: string[] = data
          .filter((item) => item.name !== ".emptyFolderPlaceholder")
          .map((item) => item.name);
        const resultUrlList = [];
        for (const url of tempUrlList) {
          try {
            const response = await fetch(public_url + url);
            const imageBlob = await response.blob();
            // 経度緯度情報を取得
            const location = await getExifData(imageBlob);
            if (location && location.lat && location.lon) {
              resultUrlList.push({ url, lat: location.lat, lng: location.lon });
            }
          } catch (e) {
            console.log(e);
            continue;
          }
        }
        // 返す
        setUrlList(resultUrlList);
      } finally {
      }
    };
    listAllImage();
  }, []);
  return (
    <div>
      <div>
        <SimpleMap
          lat={coordinates?.latitude || 0}
          lng={coordinates?.longitude || 0}
          urlList={urlList}
        />
      </div>
      <div style={{ flexWrap: "wrap" }}>
        <h1>投稿</h1>
        <div style={{ margin: "10px", width: "200px" }}>
          {urlList.map((url) => (
            <img src={public_url + url.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SimpleMap = ({ lat, lng, urlList }) => {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <LoadScript
        googleMapsApiKey={process.env.GOOGLEMAP_API_KEY || ""}
        onLoad={() => createOffsetSize()}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: lat, lng: lng }}
          zoom={19}
        >
          <Marker
            position={{ lat: lat, lng: lng }}
            icon={
              "https://maps.google.com/mapfiles/kml/paddle/blu-circle-lv.png"
            }
          />
          {urlList.map((place: any) => (
            <div key={place.url}>
              <Marker position={{ lat: place.lat, lng: place.lng }} />
              <InfoWindow
                position={{ lat: place.lat, lng: place.lng }}
                options={infoWindowOptions}
              >
                <div
                  style={divStyle}
                  className="h-10em w-10em padding-top-20px"
                >
                  <img
                    src={public_url + place.url}
                    alt="Image"
                    style={{ width: "100px", height: "auto" }}
                  />
                </div>
              </InfoWindow>
            </div>
          ))}
        </GoogleMap>
      </LoadScript>
    </main>
  );
};
export default MyComponent;
