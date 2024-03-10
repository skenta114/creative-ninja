'use client'
import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

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

  return (
    <div>
      <h1>Real-time Geolocation Example</h1>
      {coordinates !== null && (
        <p>
          現在の緯度: {coordinates.latitude}, 現在の経度: {coordinates.longitude}
        </p>
      )}
    </div>
  );
};

export default IndexPage;
