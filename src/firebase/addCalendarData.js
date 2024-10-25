// src/firebase/addCalendarData.js
import { collection, addDoc, Timestamp ,doc, setDoc} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Firebase configuration

// const tamilCalendarData = [
//   {
//     month: "சித்திரை", // Chithirai
//     start_date: Timestamp.fromDate(new Date("2025-04-14")),
//     end_date: Timestamp.fromDate(new Date("2025-05-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-04-14")), festival: "தமிழ் புத்தாண்டு" }, // Tamil New Year
//       { date: Timestamp.fromDate(new Date("2025-04-19")), festival: "ச்ரீ ராம நவராத்திரி" }, // Sri Rama Navami
//       { date: Timestamp.fromDate(new Date("2025-04-27")), festival: "பிரதோஷ வெள்ளி" }, // Pradosha Vratam
//       { date: Timestamp.fromDate(new Date("2025-04-30")), festival: "சித்திரை பௌர்ணமி" }, // Chitra Pournami
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-04-14")),
//         nakshatra: "ஆசுவினி", // Ashwini
//         thithi: "அமாவாசை", // Amavasya
//         rahu_kalam: "16:30", // 4:30 PM
//         yamagandam: "12:00", // 12:00 PM
//       },
//     ],
//   },
//   {
//     month: "வைகாசி", // Vaigasi
//     start_date: Timestamp.fromDate(new Date("2025-05-15")),
//     end_date: Timestamp.fromDate(new Date("2025-06-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-05-05")), festival: "வேசாக்" }, // Vesak
//       { date: Timestamp.fromDate(new Date("2025-05-26")), festival: "கார்த்திகை தீபம்" }, // Karthigai Deepam
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-05-15")),
//         nakshatra: "பரணி", // Bharani
//         thithi: "பூர்ணிமா", // Purnima
//         rahu_kalam: "13:30", // 1:30 PM
//         yamagandam: "07:30", // 7:30 AM
//       },
//     ],
//   },
//   {
//     month: "ஆனி", // Aani
//     start_date: Timestamp.fromDate(new Date("2025-06-15")),
//     end_date: Timestamp.fromDate(new Date("2025-07-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-06-22")), festival: "ஆடி பெருக்கு" }, // Aadi Perukku
//       { date: Timestamp.fromDate(new Date("2025-06-30")), festival: "ஆனி திருமஞ்சனம்" }, // Aani Thirumanjanam
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-06-15")),
//         nakshatra: "கிரித்திகை", // Krittika
//         thithi: "அமாவாசை", // Amavasya
//         rahu_kalam: "10:30", // 10:30 AM
//         yamagandam: "16:00", // 4:00 PM
//       },
//     ],
//   },
//   {
//     month: "ஆடி", // Aadi
//     start_date: Timestamp.fromDate(new Date("2025-07-15")),
//     end_date: Timestamp.fromDate(new Date("2025-08-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-07-15")), festival: "ஆடி வெள்ளி" }, // Aadi Velli
//       { date: Timestamp.fromDate(new Date("2025-07-31")), festival: "ஆடி பூலம்" }, // Aadi Pooram
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-07-15")),
//         nakshatra: "ரோஹிணி", // Rohini
//         thithi: "ஷஷ்டி", // Shasti
//         rahu_kalam: "15:00", // 3:00 PM
//         yamagandam: "09:30", // 9:30 AM
//       },
//     ],
//   },
//   {
//     month: "ஆவணி", // Aavani
//     start_date: Timestamp.fromDate(new Date("2025-08-15")),
//     end_date: Timestamp.fromDate(new Date("2025-09-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-08-28")), festival: "விநாயகர் சதுர்த்தி" }, // Vinayaka Chaturthi
//       { date: Timestamp.fromDate(new Date("2025-09-01")), festival: "ஆவணி மூல" }, // Aavani Moola
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-08-15")),
//         nakshatra: "மகா", // Magha
//         thithi: "பூர்ணிமா", // Purnima
//         rahu_kalam: "12:00", // 12:00 PM
//         yamagandam: "06:00", // 6:00 AM
//       },
//     ],
//   },
//   {
//     month: "புரட்டாசி", // Purattasi
//     start_date: Timestamp.fromDate(new Date("2025-09-15")),
//     end_date: Timestamp.fromDate(new Date("2025-10-14")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-09-15")), festival: "புரட்டாசி சனிக்கிழமை" }, // Purattasi Saturday
//       { date: Timestamp.fromDate(new Date("2025-09-29")), festival: "நவராத்திரி துவக்கம்" }, // Navaratri Begins
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-09-15")),
//         nakshatra: "புனர்வசு", // Punarvasu
//         thithi: "துவாதசி", // Dwadashi
//         rahu_kalam: "13:00", // 1:00 PM
//         yamagandam: "07:00", // 7:00 AM
//       },
//     ],
//   },
//   {
//     month: "ஐப்பசி", // Aippasi
//     start_date: Timestamp.fromDate(new Date("2025-10-15")),
//     end_date: Timestamp.fromDate(new Date("2025-11-13")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-10-08")), festival: "தசரா" }, // Dussehra
//       { date: Timestamp.fromDate(new Date("2025-10-21")), festival: "தீபாவளி" }, // Deepavali
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-10-15")),
//         nakshatra: "புஷ்யம்", // Pushya
//         thithi: "அமாவாசை", // Amavasya
//         rahu_kalam: "17:00", // 5:00 PM
//         yamagandam: "11:00", // 11:00 AM
//       },
//     ],
//   },
//   {
//     month: "கார்த்திகை", // Karthikai
//     start_date: Timestamp.fromDate(new Date("2025-11-14")),
//     end_date: Timestamp.fromDate(new Date("2025-12-13")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-11-14")), festival: "கார்த்திகை தீபம்" }, // Karthikai Deepam
//       { date: Timestamp.fromDate(new Date("2025-11-25")), festival: "திருக்கார்த்திகை" }, // Thirukarthikai
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-11-15")),
//         nakshatra: "ரோஹிணி", // Rohini
//         thithi: "பூர்ணிமா", // Purnima
//         rahu_kalam: "14:00", // 2:00 PM
//         yamagandam: "08:00", // 8:00 AM
//       },
//     ],
//   },
//   {
//     month: "மார்கழி", // Margazhi
//     start_date: Timestamp.fromDate(new Date("2025-12-14")),
//     end_date: Timestamp.fromDate(new Date("2026-01-12")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2025-12-01")), festival: "மார்கழி நொம்பு" }, // Margazhi Nombu
//       { date: Timestamp.fromDate(new Date("2025-12-25")), festival: "கிறிஸ்துமஸ்" }, // Christmas
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2025-12-15")),
//         nakshatra: "மூலா", // Moola
//         thithi: "அமாவாசை", // Amavasya
//         rahu_kalam: "11:30", // 11:30 AM
//         yamagandam: "15:30", // 3:30 PM
//       },
//     ],
//   },
//   {
//     month: "தை", // Thai
//     start_date: Timestamp.fromDate(new Date("2026-01-13")),
//     end_date: Timestamp.fromDate(new Date("2026-02-11")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2026-01-14")), festival: "பொங்கல்" }, // Pongal
//       { date: Timestamp.fromDate(new Date("2026-01-26")), festival: "இந்திரா சங்கராபரம்" }, // Indra Sankalpam
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2026-01-15")),
//         nakshatra: "பூரம்", // Puram
//         thithi: "பூர்ணிமா", // Purnima
//         rahu_kalam: "12:15", // 12:15 PM
//         yamagandam: "06:30", // 6:30 AM
//       },
//     ],
//   },
//   {
//     month: "மாசி", // Masi
//     start_date: Timestamp.fromDate(new Date("2026-02-12")),
//     end_date: Timestamp.fromDate(new Date("2026-03-13")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2026-02-14")), festival: "மாசி மகம்" }, // Masi Magham
//       { date: Timestamp.fromDate(new Date("2026-03-04")), festival: "மாசி பூங்காவம்" }, // Masi Poongavum
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2026-02-15")),
//         nakshatra: "விஷாகம்", // Vishakam
//         thithi: "அமாவாசை", // Amavasya
//         rahu_kalam: "14:45", // 2:45 PM
//         yamagandam: "08:15", // 8:15 AM
//       },
//     ],
//   },
//   {
//     month: "பங்குனி", // Panguni
//     start_date: Timestamp.fromDate(new Date("2026-03-14")),
//     end_date: Timestamp.fromDate(new Date("2026-04-12")),
//     festivals: [
//       { date: Timestamp.fromDate(new Date("2026-03-10")), festival: "பங்குனி உத்திரம்" }, // Panguni Uthiram
//       { date: Timestamp.fromDate(new Date("2026-04-01")), festival: "குடி பட்வா" }, // Gudi Padwa
//     ],
//     days: [
//       {
//         date: Timestamp.fromDate(new Date("2026-03-15")),
//         nakshatra: "உத்திரம்", // Uttiram
//         thithi: "ஷஷ்டி", // Shasti
//         rahu_kalam: "18:00", // 6:00 PM
//         yamagandam: "14:00", // 2:00 PM
//       },
//     ],
//   },
// ];


// Tamil calendar data
const tamilCalendarData = [
  {
    year: 2024,
    months: [
      {
        gregorian_month: "October",
        tamil_month_start: "புரட்டாசி",
        tamil_month_end: "ஐப்பசி",
        days: [
          {
            day: 1,
            gregorian_date: "2024-10-01",
            tamil_month: "புரட்டாசி",
            tamil_day: "15",
            day_name: "செவ்வாய்",
            thithi: {
              current: "அஷ்டமி",
              previous: "சப்தமி",
              time_range: {
                previous: "இன்று காலை 06:59 AM வரை",
                current: "06:59 AM க்கு பின்"
              }
            },
            yogam: {
              name: "சித்த யோகம்",
              time_range: "இன்று காலை 10:00 AM - 11:30 AM"
            },
            nakshatram: {
              current: "பூசம்",
              previous: "புனர்பூசம்",
              time_range: {
                previous: "இன்று பகல் 12:10 PM வரை",
                current: "12:10 PM க்கு பின்"
              }
            },
            chandrashtamam: {
              name: "மகா",
              duration: "இன்று முழு நாள்"
            },
            special_events: ["விநாயகர் சதுர்த்தி விழா"],
            panchangam: {
              sunrise: "6:12 AM",
              sunset: "6:21 PM",
              moonrise: "7:45 PM",
              moonset: "6:05 AM"
            },
            is_festival_day: true,
            is_holiday: true,
            is_auspicious_day: false,
            is_mookurtham: true,
            mookurtham_details: {
              suitable_time: "9:00 AM - 11:00 AM",
              notes: "காலை நேரத்தில் திருமணங்களுக்கு முறைப்படி தரமான நாள்."
            },
            parigaram: "தைலம்",
            practices: ["பிரதோஷம்", "விரதம்"],
            rasipalan: {
              mesham: "தினம் செல்வம், பணமடைந்து வரும்.",
              rishabam: "பணியில்உள்ளவர்களுக்கு நன்மை.",
              mithunam: "உங்கள் ஆலோசனைகளை கேட்கவும்.",
              kadagam: "வீட்டில் சந்தோஷம்.",
              sithiraham: "நேற்று எடுத்த முடிவுகள் நன்மை தரும்.",
              viruchigam: "வியாபாரத்தில் புதிய வாய்ப்புகள்.",
              thulam: "தொகையிலான செலவுகள் அதிகரிக்கும்.",
              makaram: "கணவன்-மனைவிக்குள் உடன்பாடு.",
              kumba: "நட்புகளை பாதுகாப்பது முக்கியம்.",
              meenam: "படிப்பில் கவனம் செலுத்துங்கள்."
            },
            important_day: {
              description: "மருதலின் பிறந்த நாளாகிய 01.10.1940",
              famous_person: "மருதலி (தலைமுறை எழுத்தாளர்)"
            },
            daily_quote: "சொல்லுங்கள், செய்யுங்கள்; செயல் நிச்சயம் வெற்றி தரும்."
          }
        ]
      }
    ]
  }
];
  const addInitialCalendarData = async () => {
    // try {
    //   console.log("Attempting to insert data...");
    //   const collectionRef = collection(db, "tamil_calendar");
      
    //   // Loop through the calendar data and insert each month
    //   for (const monthData of tamilCalendarData) {
    //     await addDoc(collectionRef, monthData);
    //   }

    //   console.log("Data inserted successfully!");
    // } catch (error) {
    //   console.error("Error inserting data: ", error);
    // }

    try {
      console.log("Attempting to insert data...");
      // Loop through the data and upload each year and its respective months and days
      for (const yearData of tamilCalendarData) {
        const yearRef = doc(db, "tamil_calendar", `year-${yearData.year}`);
  
        // Loop through months
        for (const monthData of yearData.months) {
          const monthRef = doc(yearRef, "months", monthData.gregorian_month);
  
          // Loop through days
          for (const dayData of monthData.days) {
            const dayRef = doc(monthRef, "days", `${dayData.gregorian_date}`);
            await setDoc(dayRef, dayData);
          }
        }
      }
  
      console.log("Tamil Calendar Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading Tamil Calendar Data: ", error);
    }
  };

  export default addInitialCalendarData;
