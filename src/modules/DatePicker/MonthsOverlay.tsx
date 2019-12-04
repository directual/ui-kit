import React from 'react';
import moment, { Moment } from 'moment';

import Button from '../button/Button';
import DateControls from './DateControls/DateControls';

import {
  Month, MonthsOverlayProps, TChangePeriodFunc, TSelectDateClb,
} from './types';

import styles from '../TimePicker/TimePicker.module.scss';
// TODO убрать циклические зависимости
/* eslint-disable import/no-cycle */
import { STEPS } from './DatePickerOverlay';
import { IDates } from '../../lib/dates';


const MONTH_NUM: number = 12;

const makeMonths = (activeDate: Moment): Month[] => {
  const months = [];

  const year = activeDate && activeDate.year();

  for (let i = 1; i < MONTH_NUM + 1; i += 1) {
    const momentMonth = moment(`01.${i < 10 ? `0${i}` : i}.${year || ''}`, 'DD.MM.YYYY');
    months.push({
      isSelected: moment(momentMonth).isSame(activeDate, 'month'),
      momentMonth,
    });
  }

  return months;
};

const renderMonths = (
  activeDate: Moment,
  Dates: IDates,
  selectMonth: TSelectDateClb,
): React.ReactNode[] => {
  const months = makeMonths(activeDate);

  return months.map((month: Month): React.ReactNode => (
    <Button
      type="link"
      key={month.momentMonth.unix()}
      onClick={selectMonth(month.momentMonth)}
      pressed={month.isSelected}
    >
      {Dates.getShortMonth(month.momentMonth)}
    </Button>
  ));
};

const MonthsOverlay: React.FC<MonthsOverlayProps> = ({
  Dates,
  activeDate,
  setCurrentStep,
  setActiveDate,
}) => {
  const selectMonth: TSelectDateClb = (date) => () => {
    setActiveDate(date);
    setCurrentStep(STEPS.day);
  };

  const changeYear: TChangePeriodFunc = (dir) => () => {
    const dateToSet = activeDate && activeDate.clone();

    if (!dateToSet) return;

    if (dir === 'prev') {
      setActiveDate(dateToSet.subtract(1, 'years').startOf('year'));
      return;
    }

    setActiveDate(dateToSet.add(1, 'years').startOf('year'));
  };

  return (
    <>
      <header
        className={[
          styles['datepicker-dropdown__header'],
          styles.centered,
        ].join(' ')}
      >
        <DateControls
          onPrevClick={changeYear('prev')}
          onNextClick={changeYear('next')}
          onActiveClick={() => setCurrentStep(STEPS.year)}
          activeDateString={activeDate ? activeDate.clone().format('YYYY') : ''}
        />
      </header>

      <div className={styles['datepicker-dropdown__header-title']}>
        {Dates.getCalendarWords().chooseMonth}
      </div>

      <article
        className={[
          styles['datepicker-dropdown__body'],
          styles['month-dropdown-body'],
        ].join(' ')}
      >
        {renderMonths(activeDate || moment(), Dates, selectMonth)}
      </article>

      <footer className={styles['datepicker-dropdown__footer']}>
        <Button
          type="link"
          className={styles['footer-button']}
          onClick={selectMonth(moment())}
        >
          {Dates.getCalendarWords().current}
        </Button>
      </footer>
    </>
  );
};

export default MonthsOverlay;
