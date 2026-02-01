import express from "express";
import bodyParser from "body-parser";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// =====================
// ✅ ТАНЫ МАТЕРИАЛ ЗУРГИЙН ЛИНК
// =====================
const MATERIAL_IMAGE =
  "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625969441_889472167011856_3806361251418227227_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=xS4bInUXY1wQ7kNvwFgYVhP&_nc_oc=AdmpuEdfnjB5Camq3k_7m-KkzzB1rxkFn6lGo-TNp3yT2V2Lys91vKUzLZ6McvXmVNk&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=kIX5tbmjm8trIC_7ur4qgg&oh=00_Afuuo6MZjLZ-McwdY0YhkcaHgjRingrIcgtWCa_b6SWA5g&oe=6984B11D";

// =====================
// ✅ ТАНЫ ЗАГВАРУУД (зураг+үнэ+тайлбар)
// colors: энд өнгөнүүдээ хүссэнээрээ нэмээрэй
// =====================
const PRODUCTS = [
  {
    id: "MAXDROP",
    name: "Maxdrop",
    price: 395000,
    desc: "1m диаметер, 1м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626138711_889471480345258_8818236547695529910_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kAzbm-BL6FkQ7kNvwGcmoJU&_nc_oc=Adke5elqhVPKPt3lYzqdkAO0FRbZTEcLSt58qfpY-_nPRrL7ZuKCG8uuIWPhfjnf-hI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=s9XFDa_mQdj4et5mzS3ubA&oh=00_AfvjeY7OId2Dg7F5Fmu8XfxfjzFxI9cfq13E-vZY7Lkdxg&oe=6984ADDD",
    colors: ["#1. Цэнхэр", "#2. Усан цэнхэр", "#3. Номин ногоон", "#4. Тод ногоон", "#5. Хар ногоон", "#6. Хар хөх", "#7. Нил ягаан",  "#8. Ягаан", "#9. Улаан", "#11. Хар саарал", "#12. Цайвар саарал", "#13. Шар", "#14. Оранж", "#15. Carrot"],

  colorImages: {
"#1. Цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626430567_889682076990865_3576966546902305409_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=6GEHBYBNxIAQ7kNvwGzFzts&_nc_oc=AdlESDe2rrbUxWqIZNW-tXXYQlfv9cFzx17EVDW-ZnjFUbUw78poTC1h27p859xERKc&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=JDdSmEn6bo6vUHwDEFra0g&oh=00_AfueOijN65nZ18XvS4PD83YhddiOfI2FdA-EHRKctQsi-g&oe=69851D64",
"#2. Усан цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199335_889682046990868_2575465759160761299_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=J-IQWj2FIAkQ7kNvwHMdRmf&_nc_oc=Adm4PY_zaiURPo4GuZuvqPq3ahmbRHeY3WJ0B6dPtE9F3LxZ2omHYjHHCEwIkqDy43c&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=BODtYCuYRXIPDTN8u5YdUg&oh=00_Afv-S3vS0eTV5l3cw8DWxGKkHyZJ-UfA398XL-8bHZ__6Q&oe=698511A4",
"#3. Номин ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624467707_889682013657538_4406505866696886921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=qVmvrhHrfT0Q7kNvwFBqTNW&_nc_oc=Adk9Z2qrj9WQhaKA8nUIMEMjCKFTZJgiko03ePDnYlFJIGv57HOUjegp5BPuGdhNi0A&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=tdiMoMR1RdnZEUzVblpnpA&oh=00_AfvyeNtM0ScOkzjpYge71in9veJ8USlbT6IZ8yRMM9qlFg&oe=69850E66",
"#4. Тод ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624564932_889681980324208_5294575716611820783_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kVWVPcLh8tkQ7kNvwEU6hN_&_nc_oc=AdmcF2aJQS3uOgy-hsohTtAZahAamhnyr0jbffq529K8rFmYyLScmlYCJ1MyxBDxdUM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=gVsmyyFPw0BumTbrj2hCDw&oh=00_AfupBQy3A3Yf-xeIdJBGIKL5m5uaVtQ8xeTVAOrB_1aKvg&oe=698527A8",
"#5. Хар ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626712040_889681950324211_7587520987507904377_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y1YSRSlWoicQ7kNvwEvzlJu&_nc_oc=AdmzwH9M9pk_zMR0OzuaQGrvAjF9zvzbdroyTRjheWUrq_vLCyaAwRTB_5CTq5KAvxY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=dMdVbzy8-XtRbOCGRcd_iQ&oh=00_Aftz3ggHb-LBDsFhNqQEGmZJebKKuF8A4cBIEgwYHZUCsw&oe=69851479",
"#6. Хар хөх": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625076260_889681916990881_5236375210622964781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PAvWyg5rrwMQ7kNvwFYb8Zk&_nc_oc=Adnt4l4ET9bhJqvDrA8jedZ4MWByRdcFn1fVjPUY8OFxI6-LPmbNivDVq8OKSUo6wTg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SrMUiC93VadSoF9CUxPzNA&oh=00_AfujsAZOhA-fN_ox4I1I6xVEJ1Cd-ort9wMhMbjBcjUX8g&oe=698539EB",
"#7. Нил ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625197360_889681863657553_1272345726214128285_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ywgEEHTPlhcQ7kNvwHr5V38&_nc_oc=AdmS3gF1JGwNhqqd0cHs-T0SkJ99h1aj5HmXRd-a8z7KwAnqfKv8yTK8He3fFNguHkU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=WNcw76jK0a6_v2XHjWYJog&oh=00_Afu1hchwOw3p2-IOyiNURJZbL2u3G25R-ADUK_6xx5EPZA&oe=69851D27",
"#8. Ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624242073_889681846990888_1861742137951996410_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NLXZ-YzIH_0Q7kNvwGi5FIS&_nc_oc=AdmO3cI_t-z4q4NP18r9qs7bsVUvyUHLNmP9m78oa1-jGGGn8n_DJ2jgonWp5iHMAwM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=rLT09JT3oZJ0H_ZQBLYFSw&oh=00_AfvS1Ydi_ugfoGLS7DS6rSjG0nJs-KdYnqNnwL0VyinD5Q&oe=69851E6E",
"#9. Улаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199663_889681790324227_8819889337854321073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3qSXTPvbFM4Q7kNvwHPsBL5&_nc_oc=Adnd_noOWNj_XIB0kPELUjgAdPjZyVwzJIsJ7ishVoOltM0Flb4qUCZhEcN73SON8PU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=R4P5ovuSr2LzlMZin2ko2w&oh=00_AfsPflPHBU42ARFlqDHC-NjSUusZUjUrz7_z0_A1bJbumQ&oe=69853A0F",
"#11. Хар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626288361_889681760324230_3042069459584336444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cOYaS_BT3QsQ7kNvwE6OObn&_nc_oc=AdkyMbNMZFIrYm7sz11EqWK4Kmk4a9dJzTUJMz1X5XbK53D8TIWpwbybMr3OdZmwFHw&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SYdhAU4puSqmndH-VNPPww&oh=00_AfsMBY6lNWvwxFVxeQZ8fpWblznHVbd1lsvq3rS9WV3zgw&oe=69851A0E",
"#12. Цайвар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/627126312_889681743657565_7686414004339894386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=HyKQaS98YWEQ7kNvwFQRkn3&_nc_oc=AdkN0syGZtyYxOsURGPOE6IFpQloLhftmw-QVANhZHEVTSjPpO-dSed5ZixwXkQAswY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=DLTuxQ1qCjGRz9RnGgmrKQ&oh=00_Afue7KZFloCP8lCQKFxR0O7f8rpqnss72hkiFupFzsf6XA&oe=69852BEE",
"#13. Шар": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625514164_889681683657571_8179378683525735928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=RkPe4Ug9aJ8Q7kNvwHyucow&_nc_oc=AdlQOhpnwU4VZ5h4lXAyMaIhId6Oho_F3qICi-caTC-4xjGnUIR2oI7nKs-aSmwytU4&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=fMHtPrphZF1V8SD8Y3kCTA&oh=00_Afv6KcEOljtEKOofPVx0hraeRnN6sWlij2TQsDFafmcZmQ&oe=69851C7E",
"#14. Оранж": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625898826_889681693657570_4237677448121101363_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fePxcqneBYkQ7kNvwGhTjdg&_nc_oc=AdkMkvFfhqqXwj0hXPx_vPCpkecKyKDbadnhXBy8LJiJ-lqRPeJSeJM8COYU83PEktI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=VCHpLN1RIdm2OzBAGv_P_g&oh=00_Afuz_TDNY6b2lMj01gYSGyvrBrdNFBGeU9HuIgJ4SLfOAw&oe=698530ED",
"#15. Carrot": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/623794069_889681690324237_3773325388970943610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=K94FzyjZCI0Q7kNvwE4DIUG&_nc_oc=Adk3xVhmIa4xeoLkKHUjLfZ57rTfHkug9zDoWKUpucw_jRvedIOoWUtGtfdKmd6HcvU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=Bbpl8F1Xw_tv3xGS4b-dNg&oh=00_Aftz878jAqb9L_UyREeFRJverOdsvkYmD5X4FAP5Yn4GHw&oe=69850420"

  }
},
  {
    id: "DROP",
    name: "Drop",
    price: 315000,
    desc: "0.8m диаметер, 0.8м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626795127_889469150345491_1102311214957007984_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=73-NETyqFCMQ7kNvwEvWqan&_nc_oc=AdkzQ03YhXwagIFbe7lhAPCGtX0t63ie-dgBENj6v3mipRA_JRg5qJtLHct8sUj9tC0&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=QsaaQzyI9CgrmBhNwpi23A&oh=00_AfvAJXXx3gU0v7WDUAr4oPbzi0zlUaL8OSvirZB1s4as4Q&oe=6984CA7C",
colors: ["#1. Цэнхэр", "#2. Усан цэнхэр", "#3. Номин ногоон", "#4. Тод ногоон", "#5. Хар ногоон", "#6. Хар хөх", "#7. Нил ягаан",  "#8. Ягаан", "#9. Улаан", "#11. Хар саарал", "#12. Цайвар саарал", "#13. Шар", "#14. Оранж", "#15. Carrot"],

  colorImages: {
"#1. Цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626430567_889682076990865_3576966546902305409_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=6GEHBYBNxIAQ7kNvwGzFzts&_nc_oc=AdlESDe2rrbUxWqIZNW-tXXYQlfv9cFzx17EVDW-ZnjFUbUw78poTC1h27p859xERKc&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=JDdSmEn6bo6vUHwDEFra0g&oh=00_AfueOijN65nZ18XvS4PD83YhddiOfI2FdA-EHRKctQsi-g&oe=69851D64",
"#2. Усан цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199335_889682046990868_2575465759160761299_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=J-IQWj2FIAkQ7kNvwHMdRmf&_nc_oc=Adm4PY_zaiURPo4GuZuvqPq3ahmbRHeY3WJ0B6dPtE9F3LxZ2omHYjHHCEwIkqDy43c&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=BODtYCuYRXIPDTN8u5YdUg&oh=00_Afv-S3vS0eTV5l3cw8DWxGKkHyZJ-UfA398XL-8bHZ__6Q&oe=698511A4",
"#3. Номин ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624467707_889682013657538_4406505866696886921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=qVmvrhHrfT0Q7kNvwFBqTNW&_nc_oc=Adk9Z2qrj9WQhaKA8nUIMEMjCKFTZJgiko03ePDnYlFJIGv57HOUjegp5BPuGdhNi0A&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=tdiMoMR1RdnZEUzVblpnpA&oh=00_AfvyeNtM0ScOkzjpYge71in9veJ8USlbT6IZ8yRMM9qlFg&oe=69850E66",
"#4. Тод ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624564932_889681980324208_5294575716611820783_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kVWVPcLh8tkQ7kNvwEU6hN_&_nc_oc=AdmcF2aJQS3uOgy-hsohTtAZahAamhnyr0jbffq529K8rFmYyLScmlYCJ1MyxBDxdUM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=gVsmyyFPw0BumTbrj2hCDw&oh=00_AfupBQy3A3Yf-xeIdJBGIKL5m5uaVtQ8xeTVAOrB_1aKvg&oe=698527A8",
"#5. Хар ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626712040_889681950324211_7587520987507904377_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y1YSRSlWoicQ7kNvwEvzlJu&_nc_oc=AdmzwH9M9pk_zMR0OzuaQGrvAjF9zvzbdroyTRjheWUrq_vLCyaAwRTB_5CTq5KAvxY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=dMdVbzy8-XtRbOCGRcd_iQ&oh=00_Aftz3ggHb-LBDsFhNqQEGmZJebKKuF8A4cBIEgwYHZUCsw&oe=69851479",
"#6. Хар хөх": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625076260_889681916990881_5236375210622964781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PAvWyg5rrwMQ7kNvwFYb8Zk&_nc_oc=Adnt4l4ET9bhJqvDrA8jedZ4MWByRdcFn1fVjPUY8OFxI6-LPmbNivDVq8OKSUo6wTg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SrMUiC93VadSoF9CUxPzNA&oh=00_AfujsAZOhA-fN_ox4I1I6xVEJ1Cd-ort9wMhMbjBcjUX8g&oe=698539EB",
"#7. Нил ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625197360_889681863657553_1272345726214128285_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ywgEEHTPlhcQ7kNvwHr5V38&_nc_oc=AdmS3gF1JGwNhqqd0cHs-T0SkJ99h1aj5HmXRd-a8z7KwAnqfKv8yTK8He3fFNguHkU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=WNcw76jK0a6_v2XHjWYJog&oh=00_Afu1hchwOw3p2-IOyiNURJZbL2u3G25R-ADUK_6xx5EPZA&oe=69851D27",
"#8. Ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624242073_889681846990888_1861742137951996410_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NLXZ-YzIH_0Q7kNvwGi5FIS&_nc_oc=AdmO3cI_t-z4q4NP18r9qs7bsVUvyUHLNmP9m78oa1-jGGGn8n_DJ2jgonWp5iHMAwM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=rLT09JT3oZJ0H_ZQBLYFSw&oh=00_AfvS1Ydi_ugfoGLS7DS6rSjG0nJs-KdYnqNnwL0VyinD5Q&oe=69851E6E",
"#9. Улаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199663_889681790324227_8819889337854321073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3qSXTPvbFM4Q7kNvwHPsBL5&_nc_oc=Adnd_noOWNj_XIB0kPELUjgAdPjZyVwzJIsJ7ishVoOltM0Flb4qUCZhEcN73SON8PU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=R4P5ovuSr2LzlMZin2ko2w&oh=00_AfsPflPHBU42ARFlqDHC-NjSUusZUjUrz7_z0_A1bJbumQ&oe=69853A0F",
"#11. Хар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626288361_889681760324230_3042069459584336444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cOYaS_BT3QsQ7kNvwE6OObn&_nc_oc=AdkyMbNMZFIrYm7sz11EqWK4Kmk4a9dJzTUJMz1X5XbK53D8TIWpwbybMr3OdZmwFHw&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SYdhAU4puSqmndH-VNPPww&oh=00_AfsMBY6lNWvwxFVxeQZ8fpWblznHVbd1lsvq3rS9WV3zgw&oe=69851A0E",
"#12. Цайвар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/627126312_889681743657565_7686414004339894386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=HyKQaS98YWEQ7kNvwFQRkn3&_nc_oc=AdkN0syGZtyYxOsURGPOE6IFpQloLhftmw-QVANhZHEVTSjPpO-dSed5ZixwXkQAswY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=DLTuxQ1qCjGRz9RnGgmrKQ&oh=00_Afue7KZFloCP8lCQKFxR0O7f8rpqnss72hkiFupFzsf6XA&oe=69852BEE",
"#13. Шар": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625514164_889681683657571_8179378683525735928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=RkPe4Ug9aJ8Q7kNvwHyucow&_nc_oc=AdlQOhpnwU4VZ5h4lXAyMaIhId6Oho_F3qICi-caTC-4xjGnUIR2oI7nKs-aSmwytU4&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=fMHtPrphZF1V8SD8Y3kCTA&oh=00_Afv6KcEOljtEKOofPVx0hraeRnN6sWlij2TQsDFafmcZmQ&oe=69851C7E",
"#14. Оранж": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625898826_889681693657570_4237677448121101363_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fePxcqneBYkQ7kNvwGhTjdg&_nc_oc=AdkMkvFfhqqXwj0hXPx_vPCpkecKyKDbadnhXBy8LJiJ-lqRPeJSeJM8COYU83PEktI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=VCHpLN1RIdm2OzBAGv_P_g&oh=00_Afuz_TDNY6b2lMj01gYSGyvrBrdNFBGeU9HuIgJ4SLfOAw&oe=698530ED",
"#15. Carrot": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/623794069_889681690324237_3773325388970943610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=K94FzyjZCI0Q7kNvwE4DIUG&_nc_oc=Adk3xVhmIa4xeoLkKHUjLfZ57rTfHkug9zDoWKUpucw_jRvedIOoWUtGtfdKmd6HcvU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=Bbpl8F1Xw_tv3xGS4b-dNg&oh=00_Aftz878jAqb9L_UyREeFRJverOdsvkYmD5X4FAP5Yn4GHw&oe=69850420"
  }
},
  {
    id: "LONG",
    name: "Long",
    price: 370000,
    desc: "1m өргөн, 1.5м урттай бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624620676_889469070345499_1589862224486377274_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Ee4vG2TqvAsQ7kNvwEPYMym&_nc_oc=AdlVIADjHOMIOjD04D2SUOjJhWDyQ7HAMvHBuDb3pC695wPkcr5u6PKjErA3y5VZehY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=oZaXrXu0CvxiPsqipg5zyg&oh=00_AfvLYQnTNe01Tj86T0nyHGaEUA7-IHWU_YznxK7iA882HA&oe=6984C101",
colors: ["#1. Цэнхэр", "#2. Усан цэнхэр", "#3. Номин ногоон", "#4. Тод ногоон", "#5. Хар ногоон", "#6. Хар хөх", "#7. Нил ягаан",  "#8. Ягаан", "#9. Улаан", "#11. Хар саарал", "#12. Цайвар саарал", "#13. Шар", "#14. Оранж", "#15. Carrot"],

  colorImages: {
"#1. Цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626430567_889682076990865_3576966546902305409_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=6GEHBYBNxIAQ7kNvwGzFzts&_nc_oc=AdlESDe2rrbUxWqIZNW-tXXYQlfv9cFzx17EVDW-ZnjFUbUw78poTC1h27p859xERKc&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=JDdSmEn6bo6vUHwDEFra0g&oh=00_AfueOijN65nZ18XvS4PD83YhddiOfI2FdA-EHRKctQsi-g&oe=69851D64",
"#2. Усан цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199335_889682046990868_2575465759160761299_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=J-IQWj2FIAkQ7kNvwHMdRmf&_nc_oc=Adm4PY_zaiURPo4GuZuvqPq3ahmbRHeY3WJ0B6dPtE9F3LxZ2omHYjHHCEwIkqDy43c&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=BODtYCuYRXIPDTN8u5YdUg&oh=00_Afv-S3vS0eTV5l3cw8DWxGKkHyZJ-UfA398XL-8bHZ__6Q&oe=698511A4",
"#3. Номин ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624467707_889682013657538_4406505866696886921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=qVmvrhHrfT0Q7kNvwFBqTNW&_nc_oc=Adk9Z2qrj9WQhaKA8nUIMEMjCKFTZJgiko03ePDnYlFJIGv57HOUjegp5BPuGdhNi0A&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=tdiMoMR1RdnZEUzVblpnpA&oh=00_AfvyeNtM0ScOkzjpYge71in9veJ8USlbT6IZ8yRMM9qlFg&oe=69850E66",
"#4. Тод ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624564932_889681980324208_5294575716611820783_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kVWVPcLh8tkQ7kNvwEU6hN_&_nc_oc=AdmcF2aJQS3uOgy-hsohTtAZahAamhnyr0jbffq529K8rFmYyLScmlYCJ1MyxBDxdUM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=gVsmyyFPw0BumTbrj2hCDw&oh=00_AfupBQy3A3Yf-xeIdJBGIKL5m5uaVtQ8xeTVAOrB_1aKvg&oe=698527A8",
"#5. Хар ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626712040_889681950324211_7587520987507904377_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y1YSRSlWoicQ7kNvwEvzlJu&_nc_oc=AdmzwH9M9pk_zMR0OzuaQGrvAjF9zvzbdroyTRjheWUrq_vLCyaAwRTB_5CTq5KAvxY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=dMdVbzy8-XtRbOCGRcd_iQ&oh=00_Aftz3ggHb-LBDsFhNqQEGmZJebKKuF8A4cBIEgwYHZUCsw&oe=69851479",
"#6. Хар хөх": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625076260_889681916990881_5236375210622964781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PAvWyg5rrwMQ7kNvwFYb8Zk&_nc_oc=Adnt4l4ET9bhJqvDrA8jedZ4MWByRdcFn1fVjPUY8OFxI6-LPmbNivDVq8OKSUo6wTg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SrMUiC93VadSoF9CUxPzNA&oh=00_AfujsAZOhA-fN_ox4I1I6xVEJ1Cd-ort9wMhMbjBcjUX8g&oe=698539EB",
"#7. Нил ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625197360_889681863657553_1272345726214128285_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ywgEEHTPlhcQ7kNvwHr5V38&_nc_oc=AdmS3gF1JGwNhqqd0cHs-T0SkJ99h1aj5HmXRd-a8z7KwAnqfKv8yTK8He3fFNguHkU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=WNcw76jK0a6_v2XHjWYJog&oh=00_Afu1hchwOw3p2-IOyiNURJZbL2u3G25R-ADUK_6xx5EPZA&oe=69851D27",
"#8. Ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624242073_889681846990888_1861742137951996410_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NLXZ-YzIH_0Q7kNvwGi5FIS&_nc_oc=AdmO3cI_t-z4q4NP18r9qs7bsVUvyUHLNmP9m78oa1-jGGGn8n_DJ2jgonWp5iHMAwM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=rLT09JT3oZJ0H_ZQBLYFSw&oh=00_AfvS1Ydi_ugfoGLS7DS6rSjG0nJs-KdYnqNnwL0VyinD5Q&oe=69851E6E",
"#9. Улаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199663_889681790324227_8819889337854321073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3qSXTPvbFM4Q7kNvwHPsBL5&_nc_oc=Adnd_noOWNj_XIB0kPELUjgAdPjZyVwzJIsJ7ishVoOltM0Flb4qUCZhEcN73SON8PU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=R4P5ovuSr2LzlMZin2ko2w&oh=00_AfsPflPHBU42ARFlqDHC-NjSUusZUjUrz7_z0_A1bJbumQ&oe=69853A0F",
"#11. Хар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626288361_889681760324230_3042069459584336444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cOYaS_BT3QsQ7kNvwE6OObn&_nc_oc=AdkyMbNMZFIrYm7sz11EqWK4Kmk4a9dJzTUJMz1X5XbK53D8TIWpwbybMr3OdZmwFHw&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SYdhAU4puSqmndH-VNPPww&oh=00_AfsMBY6lNWvwxFVxeQZ8fpWblznHVbd1lsvq3rS9WV3zgw&oe=69851A0E",
"#12. Цайвар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/627126312_889681743657565_7686414004339894386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=HyKQaS98YWEQ7kNvwFQRkn3&_nc_oc=AdkN0syGZtyYxOsURGPOE6IFpQloLhftmw-QVANhZHEVTSjPpO-dSed5ZixwXkQAswY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=DLTuxQ1qCjGRz9RnGgmrKQ&oh=00_Afue7KZFloCP8lCQKFxR0O7f8rpqnss72hkiFupFzsf6XA&oe=69852BEE",
"#13. Шар": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625514164_889681683657571_8179378683525735928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=RkPe4Ug9aJ8Q7kNvwHyucow&_nc_oc=AdlQOhpnwU4VZ5h4lXAyMaIhId6Oho_F3qICi-caTC-4xjGnUIR2oI7nKs-aSmwytU4&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=fMHtPrphZF1V8SD8Y3kCTA&oh=00_Afv6KcEOljtEKOofPVx0hraeRnN6sWlij2TQsDFafmcZmQ&oe=69851C7E",
"#14. Оранж": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625898826_889681693657570_4237677448121101363_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fePxcqneBYkQ7kNvwGhTjdg&_nc_oc=AdkMkvFfhqqXwj0hXPx_vPCpkecKyKDbadnhXBy8LJiJ-lqRPeJSeJM8COYU83PEktI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=VCHpLN1RIdm2OzBAGv_P_g&oh=00_Afuz_TDNY6b2lMj01gYSGyvrBrdNFBGeU9HuIgJ4SLfOAw&oe=698530ED",
"#15. Carrot": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/623794069_889681690324237_3773325388970943610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=K94FzyjZCI0Q7kNvwE4DIUG&_nc_oc=Adk3xVhmIa4xeoLkKHUjLfZ57rTfHkug9zDoWKUpucw_jRvedIOoWUtGtfdKmd6HcvU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=Bbpl8F1Xw_tv3xGS4b-dNg&oh=00_Aftz878jAqb9L_UyREeFRJverOdsvkYmD5X4FAP5Yn4GHw&oe=69850420"

  }
},
  {
    id: "SOFA",
    name: "Sofa",
    price: 420000,
    desc: "0.8m өргөн, 1.5м урттай бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626373801_889469027012170_5478076493316185802_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Rfcs0St-xwEQ7kNvwGI0vY1&_nc_oc=Adk7Rg86FoqsHt-K3tqD1quo4rwxPOutc0IbIQ7KkiF_k5PKSO9Su5FpfchomXMCNbg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=8U0SixS5iQwpl-5MC0fR_w&oh=00_Afs-VTutmHaKA2i9jwAAcCZphEShS4vPjgtL9iHK4SWEmw&oe=6984AFA0",
   colors: ["#1. Цэнхэр", "#2. Усан цэнхэр", "#3. Номин ногоон", "#4. Тод ногоон", "#5. Хар ногоон", "#6. Хар хөх", "#7. Нил ягаан",  "#8. Ягаан", "#9. Улаан", "#11. Хар саарал", "#12. Цайвар саарал", "#13. Шар", "#14. Оранж", "#15. Carrot"],

  colorImages: {
"#1. Цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626430567_889682076990865_3576966546902305409_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=6GEHBYBNxIAQ7kNvwGzFzts&_nc_oc=AdlESDe2rrbUxWqIZNW-tXXYQlfv9cFzx17EVDW-ZnjFUbUw78poTC1h27p859xERKc&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=JDdSmEn6bo6vUHwDEFra0g&oh=00_AfueOijN65nZ18XvS4PD83YhddiOfI2FdA-EHRKctQsi-g&oe=69851D64",
"#2. Усан цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199335_889682046990868_2575465759160761299_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=J-IQWj2FIAkQ7kNvwHMdRmf&_nc_oc=Adm4PY_zaiURPo4GuZuvqPq3ahmbRHeY3WJ0B6dPtE9F3LxZ2omHYjHHCEwIkqDy43c&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=BODtYCuYRXIPDTN8u5YdUg&oh=00_Afv-S3vS0eTV5l3cw8DWxGKkHyZJ-UfA398XL-8bHZ__6Q&oe=698511A4",
"#3. Номин ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624467707_889682013657538_4406505866696886921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=qVmvrhHrfT0Q7kNvwFBqTNW&_nc_oc=Adk9Z2qrj9WQhaKA8nUIMEMjCKFTZJgiko03ePDnYlFJIGv57HOUjegp5BPuGdhNi0A&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=tdiMoMR1RdnZEUzVblpnpA&oh=00_AfvyeNtM0ScOkzjpYge71in9veJ8USlbT6IZ8yRMM9qlFg&oe=69850E66",
"#4. Тод ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624564932_889681980324208_5294575716611820783_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kVWVPcLh8tkQ7kNvwEU6hN_&_nc_oc=AdmcF2aJQS3uOgy-hsohTtAZahAamhnyr0jbffq529K8rFmYyLScmlYCJ1MyxBDxdUM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=gVsmyyFPw0BumTbrj2hCDw&oh=00_AfupBQy3A3Yf-xeIdJBGIKL5m5uaVtQ8xeTVAOrB_1aKvg&oe=698527A8",
"#5. Хар ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626712040_889681950324211_7587520987507904377_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y1YSRSlWoicQ7kNvwEvzlJu&_nc_oc=AdmzwH9M9pk_zMR0OzuaQGrvAjF9zvzbdroyTRjheWUrq_vLCyaAwRTB_5CTq5KAvxY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=dMdVbzy8-XtRbOCGRcd_iQ&oh=00_Aftz3ggHb-LBDsFhNqQEGmZJebKKuF8A4cBIEgwYHZUCsw&oe=69851479",
"#6. Хар хөх": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625076260_889681916990881_5236375210622964781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PAvWyg5rrwMQ7kNvwFYb8Zk&_nc_oc=Adnt4l4ET9bhJqvDrA8jedZ4MWByRdcFn1fVjPUY8OFxI6-LPmbNivDVq8OKSUo6wTg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SrMUiC93VadSoF9CUxPzNA&oh=00_AfujsAZOhA-fN_ox4I1I6xVEJ1Cd-ort9wMhMbjBcjUX8g&oe=698539EB",
"#7. Нил ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625197360_889681863657553_1272345726214128285_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ywgEEHTPlhcQ7kNvwHr5V38&_nc_oc=AdmS3gF1JGwNhqqd0cHs-T0SkJ99h1aj5HmXRd-a8z7KwAnqfKv8yTK8He3fFNguHkU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=WNcw76jK0a6_v2XHjWYJog&oh=00_Afu1hchwOw3p2-IOyiNURJZbL2u3G25R-ADUK_6xx5EPZA&oe=69851D27",
"#8. Ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624242073_889681846990888_1861742137951996410_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NLXZ-YzIH_0Q7kNvwGi5FIS&_nc_oc=AdmO3cI_t-z4q4NP18r9qs7bsVUvyUHLNmP9m78oa1-jGGGn8n_DJ2jgonWp5iHMAwM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=rLT09JT3oZJ0H_ZQBLYFSw&oh=00_AfvS1Ydi_ugfoGLS7DS6rSjG0nJs-KdYnqNnwL0VyinD5Q&oe=69851E6E",
"#9. Улаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199663_889681790324227_8819889337854321073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3qSXTPvbFM4Q7kNvwHPsBL5&_nc_oc=Adnd_noOWNj_XIB0kPELUjgAdPjZyVwzJIsJ7ishVoOltM0Flb4qUCZhEcN73SON8PU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=R4P5ovuSr2LzlMZin2ko2w&oh=00_AfsPflPHBU42ARFlqDHC-NjSUusZUjUrz7_z0_A1bJbumQ&oe=69853A0F",
"#11. Хар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626288361_889681760324230_3042069459584336444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cOYaS_BT3QsQ7kNvwE6OObn&_nc_oc=AdkyMbNMZFIrYm7sz11EqWK4Kmk4a9dJzTUJMz1X5XbK53D8TIWpwbybMr3OdZmwFHw&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SYdhAU4puSqmndH-VNPPww&oh=00_AfsMBY6lNWvwxFVxeQZ8fpWblznHVbd1lsvq3rS9WV3zgw&oe=69851A0E",
"#12. Цайвар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/627126312_889681743657565_7686414004339894386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=HyKQaS98YWEQ7kNvwFQRkn3&_nc_oc=AdkN0syGZtyYxOsURGPOE6IFpQloLhftmw-QVANhZHEVTSjPpO-dSed5ZixwXkQAswY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=DLTuxQ1qCjGRz9RnGgmrKQ&oh=00_Afue7KZFloCP8lCQKFxR0O7f8rpqnss72hkiFupFzsf6XA&oe=69852BEE",
"#13. Шар": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625514164_889681683657571_8179378683525735928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=RkPe4Ug9aJ8Q7kNvwHyucow&_nc_oc=AdlQOhpnwU4VZ5h4lXAyMaIhId6Oho_F3qICi-caTC-4xjGnUIR2oI7nKs-aSmwytU4&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=fMHtPrphZF1V8SD8Y3kCTA&oh=00_Afv6KcEOljtEKOofPVx0hraeRnN6sWlij2TQsDFafmcZmQ&oe=69851C7E",
"#14. Оранж": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625898826_889681693657570_4237677448121101363_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fePxcqneBYkQ7kNvwGhTjdg&_nc_oc=AdkMkvFfhqqXwj0hXPx_vPCpkecKyKDbadnhXBy8LJiJ-lqRPeJSeJM8COYU83PEktI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=VCHpLN1RIdm2OzBAGv_P_g&oh=00_Afuz_TDNY6b2lMj01gYSGyvrBrdNFBGeU9HuIgJ4SLfOAw&oe=698530ED",
"#15. Carrot": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/623794069_889681690324237_3773325388970943610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=K94FzyjZCI0Q7kNvwE4DIUG&_nc_oc=Adk3xVhmIa4xeoLkKHUjLfZ57rTfHkug9zDoWKUpucw_jRvedIOoWUtGtfdKmd6HcvU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=Bbpl8F1Xw_tv3xGS4b-dNg&oh=00_Aftz878jAqb9L_UyREeFRJverOdsvkYmD5X4FAP5Yn4GHw&oe=69850420"

  }
},
  {
    id: "ROUND",
    name: "Round",
    price: 370000,
    desc: "1.5m диаметер, 0.4м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625236736_889468923678847_3582025770422709221_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=bV7ric-FBnAQ7kNvwF4s0QI&_nc_oc=AdmAWOgqeKZmTvC2BBe9ATGP8SWcuHFsrtHmKl6xxHJsuP1qhvMJ5Qv7uBa1gyi-qPg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=iN5eBgcGFQg7g6VCGlOcMw&oh=00_Aftf7ON4DjqvrW1DdJg8zDMC8ifQ0Pwm_74SQDEoqG-vRA&oe=6984AABC",
   colors: ["#1. Цэнхэр", "#2. Усан цэнхэр", "#3. Номин ногоон", "#4. Тод ногоон", "#5. Хар ногоон", "#6. Хар хөх", "#7. Нил ягаан",  "#8. Ягаан", "#9. Улаан", "#11. Хар саарал", "#12. Цайвар саарал", "#13. Шар", "#14. Оранж", "#15. Carrot"],

  colorImages: {
"#1. Цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626430567_889682076990865_3576966546902305409_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=6GEHBYBNxIAQ7kNvwGzFzts&_nc_oc=AdlESDe2rrbUxWqIZNW-tXXYQlfv9cFzx17EVDW-ZnjFUbUw78poTC1h27p859xERKc&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=JDdSmEn6bo6vUHwDEFra0g&oh=00_AfueOijN65nZ18XvS4PD83YhddiOfI2FdA-EHRKctQsi-g&oe=69851D64",
"#2. Усан цэнхэр": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199335_889682046990868_2575465759160761299_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=J-IQWj2FIAkQ7kNvwHMdRmf&_nc_oc=Adm4PY_zaiURPo4GuZuvqPq3ahmbRHeY3WJ0B6dPtE9F3LxZ2omHYjHHCEwIkqDy43c&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=BODtYCuYRXIPDTN8u5YdUg&oh=00_Afv-S3vS0eTV5l3cw8DWxGKkHyZJ-UfA398XL-8bHZ__6Q&oe=698511A4",
"#3. Номин ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624467707_889682013657538_4406505866696886921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=qVmvrhHrfT0Q7kNvwFBqTNW&_nc_oc=Adk9Z2qrj9WQhaKA8nUIMEMjCKFTZJgiko03ePDnYlFJIGv57HOUjegp5BPuGdhNi0A&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=tdiMoMR1RdnZEUzVblpnpA&oh=00_AfvyeNtM0ScOkzjpYge71in9veJ8USlbT6IZ8yRMM9qlFg&oe=69850E66",
"#4. Тод ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624564932_889681980324208_5294575716611820783_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kVWVPcLh8tkQ7kNvwEU6hN_&_nc_oc=AdmcF2aJQS3uOgy-hsohTtAZahAamhnyr0jbffq529K8rFmYyLScmlYCJ1MyxBDxdUM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=gVsmyyFPw0BumTbrj2hCDw&oh=00_AfupBQy3A3Yf-xeIdJBGIKL5m5uaVtQ8xeTVAOrB_1aKvg&oe=698527A8",
"#5. Хар ногоон": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626712040_889681950324211_7587520987507904377_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y1YSRSlWoicQ7kNvwEvzlJu&_nc_oc=AdmzwH9M9pk_zMR0OzuaQGrvAjF9zvzbdroyTRjheWUrq_vLCyaAwRTB_5CTq5KAvxY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=dMdVbzy8-XtRbOCGRcd_iQ&oh=00_Aftz3ggHb-LBDsFhNqQEGmZJebKKuF8A4cBIEgwYHZUCsw&oe=69851479",
"#6. Хар хөх": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625076260_889681916990881_5236375210622964781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PAvWyg5rrwMQ7kNvwFYb8Zk&_nc_oc=Adnt4l4ET9bhJqvDrA8jedZ4MWByRdcFn1fVjPUY8OFxI6-LPmbNivDVq8OKSUo6wTg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SrMUiC93VadSoF9CUxPzNA&oh=00_AfujsAZOhA-fN_ox4I1I6xVEJ1Cd-ort9wMhMbjBcjUX8g&oe=698539EB",
"#7. Нил ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625197360_889681863657553_1272345726214128285_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ywgEEHTPlhcQ7kNvwHr5V38&_nc_oc=AdmS3gF1JGwNhqqd0cHs-T0SkJ99h1aj5HmXRd-a8z7KwAnqfKv8yTK8He3fFNguHkU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=WNcw76jK0a6_v2XHjWYJog&oh=00_Afu1hchwOw3p2-IOyiNURJZbL2u3G25R-ADUK_6xx5EPZA&oe=69851D27",
"#8. Ягаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624242073_889681846990888_1861742137951996410_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NLXZ-YzIH_0Q7kNvwGi5FIS&_nc_oc=AdmO3cI_t-z4q4NP18r9qs7bsVUvyUHLNmP9m78oa1-jGGGn8n_DJ2jgonWp5iHMAwM&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=rLT09JT3oZJ0H_ZQBLYFSw&oh=00_AfvS1Ydi_ugfoGLS7DS6rSjG0nJs-KdYnqNnwL0VyinD5Q&oe=69851E6E",
"#9. Улаан": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625199663_889681790324227_8819889337854321073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3qSXTPvbFM4Q7kNvwHPsBL5&_nc_oc=Adnd_noOWNj_XIB0kPELUjgAdPjZyVwzJIsJ7ishVoOltM0Flb4qUCZhEcN73SON8PU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=R4P5ovuSr2LzlMZin2ko2w&oh=00_AfsPflPHBU42ARFlqDHC-NjSUusZUjUrz7_z0_A1bJbumQ&oe=69853A0F",
"#11. Хар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626288361_889681760324230_3042069459584336444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cOYaS_BT3QsQ7kNvwE6OObn&_nc_oc=AdkyMbNMZFIrYm7sz11EqWK4Kmk4a9dJzTUJMz1X5XbK53D8TIWpwbybMr3OdZmwFHw&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=SYdhAU4puSqmndH-VNPPww&oh=00_AfsMBY6lNWvwxFVxeQZ8fpWblznHVbd1lsvq3rS9WV3zgw&oe=69851A0E",
"#12. Цайвар саарал": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/627126312_889681743657565_7686414004339894386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=HyKQaS98YWEQ7kNvwFQRkn3&_nc_oc=AdkN0syGZtyYxOsURGPOE6IFpQloLhftmw-QVANhZHEVTSjPpO-dSed5ZixwXkQAswY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=DLTuxQ1qCjGRz9RnGgmrKQ&oh=00_Afue7KZFloCP8lCQKFxR0O7f8rpqnss72hkiFupFzsf6XA&oe=69852BEE",
"#13. Шар": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625514164_889681683657571_8179378683525735928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=RkPe4Ug9aJ8Q7kNvwHyucow&_nc_oc=AdlQOhpnwU4VZ5h4lXAyMaIhId6Oho_F3qICi-caTC-4xjGnUIR2oI7nKs-aSmwytU4&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=fMHtPrphZF1V8SD8Y3kCTA&oh=00_Afv6KcEOljtEKOofPVx0hraeRnN6sWlij2TQsDFafmcZmQ&oe=69851C7E",
"#14. Оранж": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625898826_889681693657570_4237677448121101363_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fePxcqneBYkQ7kNvwGhTjdg&_nc_oc=AdkMkvFfhqqXwj0hXPx_vPCpkecKyKDbadnhXBy8LJiJ-lqRPeJSeJM8COYU83PEktI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=VCHpLN1RIdm2OzBAGv_P_g&oh=00_Afuz_TDNY6b2lMj01gYSGyvrBrdNFBGeU9HuIgJ4SLfOAw&oe=698530ED",
"#15. Carrot": "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/623794069_889681690324237_3773325388970943610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=K94FzyjZCI0Q7kNvwE4DIUG&_nc_oc=Adk3xVhmIa4xeoLkKHUjLfZ57rTfHkug9zDoWKUpucw_jRvedIOoWUtGtfdKmd6HcvU&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=Bbpl8F1Xw_tv3xGS4b-dNg&oh=00_Aftz878jAqb9L_UyREeFRJverOdsvkYmD5X4FAP5Yn4GHw&oe=69850420"

  }
},
];

// =====================
// Session (RAM)
// =====================
const sessions = new Map();

// 🔐 Verify
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.sendStatus(403);
});

// 📩 Incoming
app.post("/webhook", (req, res) => {
  const body = req.body;
  if (body.object !== "page") return res.sendStatus(404);

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const sender = event.sender?.id;
      if (!sender) continue;

      if (event.postback) handlePostback(sender, event.postback.payload);
      if (event.message && event.message.text) handleText(sender, event.message.text);
    }
  }

  return res.status(200).send("EVENT_RECEIVED");
});

// =====================
// 0) INTRO: 2 товч (материал / загвар)
// =====================
function sendIntro(sender) {
  sendButtons(sender, "👋 Сайн байна уу!\nДоорх сонголтоос сонгоно уу 👇", [
    { title: "🧵 Дүүргэлтийн материал", payload: "SHOW_MATERIAL" },
    { title: "🛍 Загварын сонголт", payload: "SHOW_TEMPLATES" },
  ]);
}

// =====================
// 1) Материал зураг
// =====================
function sendMaterial(sender) {
  sendImage(sender, MATERIAL_IMAGE);
  sendButtons(sender, "Дүүргэлтийн материал ✅", [{ title: "🛍 Загварын сонголт", payload: "SHOW_TEMPLATES" }]);
}

// =====================
// 2) Загварууд (carousel)
// =====================
function sendTemplates(sender) {
  const elements = PRODUCTS.slice(0, 10).map((p) => ({
    title: `${p.name} – ${formatMNT(p.price)}`,
    image_url: p.image,
    subtitle: p.desc || " ",
    buttons: [{ type: "postback", title: "✅ Сонгох", payload: `PICK_${p.id}` }],
  }));

  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "template",
            payload: { template_type: "generic", elements },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

// =====================
// 3) Өнгөний сонголт (3 button max)
// =====================
function sendColorCarousel(sender, productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return sendText(sender, "Загвар олдсонгүй.");

  const colors = p.colors || [];

  const elements = colors.slice(0, 10).map(c => ({
    title: c,
    image_url: p.colorImages?.[c] || p.image,
    subtitle: "Өнгө сонгох",
    buttons: [
      {
        type: "postback",
        title: "✅ Энэ өнгө",
        payload: `COLOR_${productId}_${encodeURIComponent(c)}`
      }
    ]
  }));

  request({
    uri: "https://graph.facebook.com/v19.0/me/messages",
    qs: { access_token: process.env.PAGE_TOKEN },
    method: "POST",
    json: {
      recipient: { id: sender },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements
          }
        }
      }
    }
  });
}


  sendButtons(
    sender,
    `🎨 Өнгөө сонгоно уу:\n\n${p.name} – ${formatMNT(p.price)}`,
    buttons
  );
}

// =====================
// 4) Захиалах товч
// =====================
function sendOrderButton(sender, s) {
  const p = PRODUCTS.find((x) => x.id === s.productId);
  if (!p) return sendText(sender, "Загвар олдсонгүй. Дахин эхэлье.");

  sendButtons(
    sender,
    `✅ Сонголт:\n${p.name}\nӨнгө: ${s.color}\nҮнэ: ${formatMNT(p.price)}\n\nЗахиалгаа үргэлжлүүлэх үү?`,
    [
      { title: "🛒 Захиалах", payload: "ORDER_NOW" },
      { title: "🔙 Буцах", payload: "SHOW_TEMPLATES" },
    ]
  );
}

// =====================
// POSTBACK
// =====================
function handlePostback(sender, payload) {
  if (payload === "GET_STARTED") {
    sessions.delete(sender);
    sendText(sender, "Манай онлайн дэлгүүрт тавтай морил 😊");
    sendIntro(sender);
    return;
  }

  if (payload === "SHOW_MATERIAL") {
    sessions.set(sender, { step: "intro" });
    sendMaterial(sender);
    return;
  }

  if (payload === "SHOW_TEMPLATES") {
    sessions.set(sender, { step: "choose_template" });
    sendTemplates(sender);
    return;
  }

  if (payload.startsWith("PICK_")) {
    const productId = payload.replace("PICK_", "");
    sessions.set(sender, { step: "choose_color", productId });
    sendColorMenu(sender, productId);
    return;
  }

  if (payload.startsWith("COLOR_")) {
    const parts = payload.split("_");
    const productId = parts[1];
    const color = decodeURIComponent(parts.slice(2).join("_")) || "Стандарт";

    const s = sessions.get(sender) || {};
    s.step = "ready_to_order";
    s.productId = productId;
    s.color = color;
    sessions.set(sender, s);

    sendOrderButton(sender, s);
    return;
  }

  if (payload === "ORDER_NOW") {
    const s = sessions.get(sender);
    if (!s?.productId || !s?.color) {
      sendText(sender, "Эхлээд загвар болон өнгөө сонгоно уу.");
      return sendIntro(sender);
    }
    s.step = "ask_phone";
    sessions.set(sender, s);
    sendText(sender, "📞 Захиалга баталгаажуулахын тулд холбоо барих дугаараа илгээгээрэй.");
    return;
  }

  if (payload === "CONFIRM_ORDER") {
    const s = sessions.get(sender);
    if (!s?.finalOrder) {
      sendText(sender, "Захиалга олдсонгүй. Дахин эхэлье.");
      sessions.delete(sender);
      return sendIntro(sender);
    }

    // Inbox дээр шинэ захиалга тод харагдана
    sendText(sender, `🆕 #ORDER_NEW\n\n${s.finalOrder}\n\nБид удахгүй холбогдоно 🙏`);
    sessions.set(sender, { step: "waiting_admin_done" });
    return;
  }

  if (payload === "CANCEL_ORDER") {
    sessions.delete(sender);
    sendText(sender, "❌ Захиалгыг цуцаллаа.");
    sendIntro(sender);
    return;
  }
}

// =====================
// TEXT
// =====================
function handleText(sender, textRaw) {
  const text = (textRaw || "").trim();
  const lower = text.toLowerCase();

  // DONE tag (админ тухайн чат дээр бичээд дуусгана)
  if (lower === "done" || lower === "дууслаа" || lower === "#order_done") {
    sendText(sender, "✅ #ORDER_DONE\nТаны захиалга амжилттай дууслаа 🙏");
    sessions.delete(sender);
    return;
  }

  // ✅ Ямар ч үед "сайн уу / menu / start" гэх мэт бичвэл
  const quick = lower.replace(/\s+/g, "");
  if (
    ["сайнуу", "sainuu", "hi", "hello", "hey", "assalam", "сайнбайнауу", "start", "эхлэх", "menu", "цэс", "?"].includes(quick)
  ) {
    sessions.delete(sender); // өмнөх явцыг цэвэрлэнэ
    sendIntro(sender);
    return;
  }

  const s = sessions.get(sender);

  // ✅ Хуучин хүн / session байхгүй бол: юу ч бичсэн intro гаргана
  if (!s) {
    sendIntro(sender);
    return;
  }

  // phone
  if (s.step === "ask_phone") {
    s.phone = text;
    s.step = "ask_address";
    sessions.set(sender, s);
    sendText(sender, "📦 Хүргүүлэх хаягаа (дүүрэг/хороо/байр, дэлгэрэнгүй) илгээгээрэй.");
    return;
  }

  // address -> confirm
  if (s.step === "ask_address") {
    s.address = text;

    const p = PRODUCTS.find((x) => x.id === s.productId);
    if (!p) {
      sessions.delete(sender);
      sendText(sender, "Загвар олдсонгүй. Дахин эхэлье.");
      sendIntro(sender);
      return;
    }

    const summary =
      "🧾 Захиалгын мэдээлэл\n\n" +
      `• Загвар: ${p.name}\n` +
      `• Өнгө: ${s.color}\n` +
      `• Үнэ: ${formatMNT(p.price)}\n\n` +
      `☎️ Утас: ${s.phone}\n` +
      `📦 Хаяг: ${s.address}\n\n` +
      "Зөв бол Баталгаажуулах дээр дарна уу.";

    s.finalOrder = summary;
    s.step = "confirm";
    sessions.set(sender, s);

    sendButtons(sender, summary, [
      { title: "✅ Баталгаажуулах", payload: "CONFIRM_ORDER" },
      { title: "❌ Цуцлах", payload: "CANCEL_ORDER" },
    ]);
    return;
  }

  // default
  sendIntro(sender);
}

// =====================
// HELPERS
// =====================
function sendText(sender, text) {
  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: { recipient: { id: sender }, message: { text } },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function sendImage(sender, imageUrl) {
  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "image",
            payload: { url: imageUrl, is_reusable: true },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function sendButtons(sender, text, buttons) {
  // ✅ Автоматаар FB-д хэрэгтэй хэлбэр рүү хувиргана
  const fbButtons = (buttons || []).slice(0, 3).map((b) => ({
    type: b.type || "postback",
    title: b.title,
    payload: b.payload,
  }));

  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text,
              buttons: fbButtons,
            },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function formatMNT(n) {
  return `${Number(n).toLocaleString("mn-MN")}MNT`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Bot running on port", PORT));
