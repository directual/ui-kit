import React from 'react';
import moment, { Moment } from 'moment';

import Button from '../button/Button';
import DateControls from './DateControls/DateControls';

import {
  Year, YearsOverlayProps, TChangePeriodFunc, TSelectDateClb,
} from './types';

import styles from '../TimePicker/TimePicker.module.scss';
// TODO убрать циклические зависимости
/* eslint-disable import/no-cycle */
import { STEPS } from './DatePickerOverlay';


// количество лет слева и справа от текущего года
// в дропдауне выбора года
const YEARS_BEFORE_CURRENT = 4;
const YEARS_AFTER_CURRENT = 7;

const makeYears = (activeDate: Moment): Year[] => {
  const years = [];

  for (let i = -YEARS_BEFORE_CURRENT; i < YEARS_AFTER_CURRENT + 1; i += 1) {
    let momentYear = moment(activeDate).clone().startOf('year');
    if (i <= 0) {
      momentYear = momentYear.subtract(-i, 'years');
    } else {
      momentYear = momentYear.add(i, 'years');
    }

    years.push({
      isSelected: moment(momentYear).isSame(activeDate, 'year'),
      momentYear,
      inActivePeriod: i !== -YEARS_BEFORE_CURRENT && i !== YEARS_AFTER_CURRENT,
    });
  }

  return years;
};

const getYearsPeriod = (activeDate: Moment): string => {
  if (!activeDate) return '';

  const startYear = activeDate.clone().subtract(3, 'years').format('YYYY');
  const endYear = activeDate.clone().add(6, 'years').format('YYYY');

  return `${startYear}-${endYear}`;
};

const renderYears = (
  activeDate: Moment,
  selectYear: TSelectDateClb,
):React.ReactNode[] => {
  const years = makeYears(activeDate);

  return years.map((year: Year): React.ReactNode => (
    <Button
      type="link"
      key={year.momentYear.unix()}
      className={!year.inActivePeriod ? styles['not-active'] : ''}
      onClick={selectYear(year.momentYear)}
      pressed={year.isSelected}
    >
      {year.momentYear.format('YYYY')}
    </Button>
  ));
};

const YearsOverlay: React.FC<YearsOverlayProps> = ({
  Dates,
  activeDate = moment(),
  setCurrentStep,
  setActiveDate,
}) => {
  const selectYear: TSelectDateClb = (date) => () => {
    setActiveDate(date);
    setCurrentStep(STEPS.month);
  };

  const changeYears: TChangePeriodFunc = (diff) => () => {
    const dateToSet = activeDate && activeDate.clone();
    if (!dateToSet) return;

    if (diff === 'prev') {
      setActiveDate(dateToSet.subtract(10, 'years').startOf('year'));
      return;
    }

    setActiveDate(dateToSet.add(10, 'years').startOf('year'));
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
          onPrevClick={changeYears('prev')}
          onNextClick={changeYears('next')}
          activeDateString={getYearsPeriod(activeDate)}
        />
      </header>

      <div className={styles['datepicker-dropdown__header-title']}>
        {Dates.getCalendarWords().chooseYear}
      </div>

      <article
        className={[
          styles['datepicker-dropdown__body'],
          styles['month-dropdown-body'],
        ].join(' ')}
      >
        {renderYears(activeDate, selectYear)}
      </article>

      <footer className={styles['datepicker-dropdown__footer']}>
        <Button
          type="link"
          className={styles['footer-button']}
          onClick={selectYear(moment())}
        >
          {Dates.getCalendarWords().current}
        </Button>
      </footer>
    </>
  );
};

export default YearsOverlay;
