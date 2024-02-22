import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';

import avatarImage from '../assets/IMG_2888.jpg';
export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
    filteredEvents,
  } = useContext(GlobalContext);
  // console.log(daySelected)
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  const formattedEvents = filteredEvents.map(event => {
    return {
      ...event,
      day: dayjs(event.day).format('DD-MM-YY')
    };
  });
  console.log(formattedEvents);
  
  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  const nowDay = dayjs().format("DD-MM-YY"); // Đặt nowDay ở đây để có thể sử dụng trong hàm return
  const nowDay1 = dayjs().format("D MMMM");
  function getDayClass(day) {
    const format = "DD-MM-YY";
    // const nowDay = dayjs().format(format);
    console.log(nowDay)
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    }
    else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            "MMMM YYYY"
          )}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6" >
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap">
          <span className="text-blue-500 font-bold mb-3">Upcoming Events</span>
          <span className="text-gray-500 font-bold text-xs mb-3">Today, {nowDay1}</span>
        </div>
        <div style={{height:"17rem", overflow: "auto"}}>
        {formattedEvents.map((event, index) => {
          const format = "DD-MM-YY";
          const nowDay = dayjs().format(format);
          const eventDay = event.day;
          if (nowDay === eventDay) {
            return (
              <div className="flex flex-col px-3 py-3 border-l-4 border-blue-900 rounded-md mb-3" key={index} style={{ backgroundColor: '#FFE4C8' }}>
                <div class="grid grid-cols-12">
                  <div class="col-span-9">
                    <div class="flex flex-col">
                      <span class="font-bold mb-2  text-blue-900">{event.title}</span>
                      <span class="text-sm mb-2 text-gray-500">{event.time}</span>
                      <div>
                        <Avatar src={avatarImage} size={32} />
                        <a class="ml-3 text-sm text-blue-300" target="blank" href={event.description}>
                          <u>Go to link</u>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <div class="flex flex-col">
                      <FontAwesomeIcon icon={faVideo} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
        </div>
      </div>
    </div>
  );
}
