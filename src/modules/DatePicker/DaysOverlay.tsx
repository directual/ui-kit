// TODO убрать циклические зависимости
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { MouseEvent } from 'react';
import moment, { Moment } from 'moment';
import cn from 'classnames';
import get from 'lodash/get';

import Button from '../button/Button';
import DateControls from './DateControls/DateControls';
import { Day, DaysOverlayProps, TChangePeriodFunc } from './types';

import styles from '../TimePicker/TimePicker.module.scss';
import { STEPS } from './DatePickerOverlay';


const CALENDAR_SLOTS: number = 42;

const makeWeekDays = (activeDate: Moment | undefined, selectedDate: Moment | undefined): Day[] => {
  const daysInMonth = moment(activeDate).clone().daysInMonth();
  const firstDayInMonth = moment(activeDate).clone().startOf('month');
  const weekdayOfFirstDay = moment(firstDayInMonth).clone().weekday();

  const days = [];

  // добавляем недостающие дни слева из предыдущего месяца
  if (weekdayOfFirstDay !== 0) {
    for (let i = weekdayOfFirstDay; i > 0; i -= 1) {
      const pastDay = firstDayInMonth.clone().subtract(i, 'd');
      days.push({
        isActiveMonth: false,
        momentDay: pastDay,
        isCurrent: moment().isSame(pastDay, 'day'),
        isSelected: moment(pastDay).isSame(selectedDate, 'day'),
      });
    }
  }

  // добавляем дни выбранного месяца
  for (let i = 0; i < daysInMonth; i += 1) {
    const day = firstDayInMonth.clone().add(i, 'd');

    days.push({
      isActiveMonth: true,
      momentDay: day,
      isCurrent: moment().isSame(day, 'day'),
      isSelected: moment(day).isSame(selectedDate, 'day'),
    });
  }

  const daysLength = days.length;

  // добавляем дни из следующего месяца справа
  if (daysLength < CALENDAR_SLOTS) {
    for (let i = 0; i < CALENDAR_SLOTS - daysLength; i += 1) {
      const nextDay = firstDayInMonth.clone().add(daysInMonth + i, 'd');

      days.push({
        isActiveMonth: false,
        momentDay: nextDay,
        isCurrent: moment().isSame(nextDay, 'day'),
        isSelected: moment(nextDay).isSame(selectedDate, 'day'),
      });
    }
  }

  return days;
};

const renderWeekDays = (activeDate: Moment | undefined, selectedDate: Moment | undefined) :React.ReactNode[] => {
  const days: Day[] = makeWeekDays(activeDate, selectedDate);

  return days.map((day:Day) => (
    <button
      key={day.momentDay.unix()}
      data-day={day.momentDay.unix()}
      data-is-day
      className={cn(
        styles.day,
        {
          [styles['day_not-active']]: !day.isActiveMonth,
          [styles.day_current]: day.isCurrent,
          [styles.day_selected]: day.isSelected,
        },
      )}
      type="button"
    >
      {day.momentDay.format('D')}
    </button>
  ));
};

const DaysOverlay: React.FC<DaysOverlayProps> = ({
  Dates,
  activeDate,
  selectedDate,
  setCurrentStep,
  setActiveDate,
  selectDate,
}) => {
  const weekdayNames = Dates.getWeekdaysShort();

  const changeMonth: TChangePeriodFunc = (dir) => () => {
    const dateToSet = activeDate && activeDate.clone();

    if (!dateToSet) return;

    if (dir === 'prev') {
      setActiveDate(dateToSet.clone().subtract(1, 'months'));
      return;
    }

    setActiveDate(dateToSet.clone().add(1, 'months'));
  };

  const selectToday = () => {
    const todayMoment: Moment = moment();
    setActiveDate(todayMoment.clone());
    if (selectDate) {
      selectDate(todayMoment.clone(), true);
    }
  };

  // делегируем обработку клика на контейнер
  const onSelectDate = (evt: MouseEvent<HTMLElement, MouseEvent>) => {
    if (!evt) return;

    const { target } = evt;
    const day = get(target, 'dataset.day', '');
    const isDay = get(target, 'dataset.isDay', '');

    if (day && isDay && selectDate) {
      selectDate(moment.unix(day), true);
    }
  };

  return (
    <>
      <header className={styles['datepicker-dropdown__header']}>
        <DateControls
          onPrevClick={changeMonth('prev')}
          onNextClick={changeMonth('next')}
          onActiveClick={() => setCurrentStep(STEPS.month)}
          activeDateString={
            activeDate
              ? activeDate.locale(Dates.locale).format('MMMM')
              : ''
          }
        />
        <Button
          type="link"
          onClick={() => setCurrentStep(STEPS.year)}
          className={styles['header-year-control']}
        >
          {activeDate && activeDate.format('YYYY')}
        </Button>
      </header>

      <article
        className={cn(
          styles['datepicker-dropdown__body'],
          styles['day-dropdown-body'],
        )}
        // @ts-ignore
        onClick={onSelectDate}
      >
        {weekdayNames.map((weekdayName: string): React.ReactNode => (
          <div
            key={weekdayName}
            className={styles.weekday__name}
          >
            {weekdayName}
          </div>
        ))}

        {renderWeekDays(activeDate, selectedDate)}
      </article>

      <footer className={styles['datepicker-dropdown__footer']}>
        <Button
          type="link"
          className={styles['footer-button']}
          onClick={selectToday}
        >
          {Dates.getCalendarWords().today}
        </Button>
      </footer>
    </>
  );
};

export default DaysOverlay;
