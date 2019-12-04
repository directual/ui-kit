import React from 'react';
import style from './KeyValue.module.scss';


interface KeyValueProps {
  /** key value pairs to render, value may be react-component  */
  data: Array<{
    key: string;
    value: any;
  }>;
  /** styles for keyCol */
  keyColStyle?: {
    [key: string]: any;
  };
  /** styles for valueCol */
  valueColStyle?: {
    [key: string]: any;
  };
  /** key value component style */
  className?: string;
}

const KeyValue = ({
  data, className, keyColStyle, valueColStyle,
}: KeyValueProps) => (
  <div
    className={[className || '', style['key-value']].join(' ')}
  >
    <table className={style['key-value__table']}>
      <tbody>
        {data.map(({ key, value }) => (
          <tr key={key} className={style.row}>
            <td
              style={keyColStyle || {}}
              className={style.row__key}
            >
              {key}
            </td>
            <td
              style={valueColStyle || {}}
              className={style.row__value}
            >
              {typeof value === 'function' ? value() : value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default KeyValue;
