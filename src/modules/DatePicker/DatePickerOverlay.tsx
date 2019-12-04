// TODO убрать циклические зависимости
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import { useStorybook } from '../StorybookProvider/withStorybook';

import DaysOverlay from './DaysOverlay';
import MonthsOverlay from './MonthsOverlay';
import YearsOverlay from './YearsOverlay';


export const STEPS = {
  day: 'day',
  month: 'months',
  year: 'years',
};

const DatePickerOverlay: React.FC<any> = ({
  selectDate,
  selectedDate,
}) => {
  const { Dates } = useStorybook();
  const [activeDate, setActiveDate] = useState<Moment>(
    selectedDate
      ? selectedDate.clone().startOf('month')
      : moment().startOf('month'),
  );
  const [currentStep, setCurrentStep] = useState<string>(STEPS.day);

  const preventInputBlur = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div onMouseDown={preventInputBlur}>
      {
        currentStep === STEPS.day
        && (
        <DaysOverlay
          Dates={Dates}
          activeDate={activeDate}
          selectedDate={selectedDate}
          selectDate={selectDate}
          setCurrentStep={setCurrentStep}
          setActiveDate={setActiveDate}
        />
        )
      }

      {
        currentStep === STEPS.month
        && (
        <MonthsOverlay
          Dates={Dates}
          activeDate={activeDate}
          setCurrentStep={setCurrentStep}
          setActiveDate={setActiveDate}
        />
        )
      }

      {
        currentStep === STEPS.year
        && (
        <YearsOverlay
          Dates={Dates}
          activeDate={activeDate}
          setCurrentStep={setCurrentStep}
          setActiveDate={setActiveDate}
        />
        )
      }
    </div>
  );
};

export default DatePickerOverlay;
