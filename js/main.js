import { codeToText } from "./weatherText.js";
//ボタンを押すと緯度、経度を取得
document.getElementById("getBtn").addEventListener("click", () => {
  // セレクトボックスから緯度,経度を取得
  const cityValue = document.getElementById("citySelect").value;
  const [lat, lon] = cityValue.split(","); //カンマで区切る
  
  getWeather(lat, lon); 
});

// 指定された座標の天気情報を取得する関数
async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
  const display = document.getElementById("temp");
  display.textContent = "取得中...";

  // APIからデータを取得
  const response = await fetch(url);
  const data = await response.json();
  
 
  const temp = data.current_weather.temperature; //気温データを取り出す
  const code = data.current_weather.weathercode; //天気のコードを取り出す
  const weather = codeToText(code); //関数に渡す

  //表示
  display.textContent = `${weather} / 気温 ${temp}℃`; 
}