import React from 'react';
import './index.scss';

export interface Props {
  overlay: any;
  children: any;
  isDropped: boolean;
  onToggle: (source: string) => any;
  // пока можно управлять положением при помощи props style / overlayStyle
  style?: any;
  overlayStyle?: any;
}

interface State {
  isDropped: boolean;
}

export const TOGGLE_SOURCES = {
  outside: 'outside',
  control: 'control',
};

class Dropdown extends React.Component<Props, State> {
  dropdownWrapperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onToggle = (source: string) => {
    const { onToggle } = this.props;
    if (typeof onToggle === 'function') {
      onToggle(source);
    }
  };

  handleClickOutside: EventListener = (event: MouseEvent) => {
    const { isDropped } = this.props;
    if (
      this.dropdownWrapperRef
      && this.dropdownWrapperRef.current
      && !this.dropdownWrapperRef.current.contains(event.target as HTMLElement)
      && isDropped
    ) {
      this.onToggle(TOGGLE_SOURCES.outside);
    }
  };


  render(): React.ReactNode {
    const handleKeyUp = (e: React.KeyboardEvent<any>) => {
      const SPACE_KEY_CODE = 32;
      const keycode = (e.keyCode ? e.keyCode : e.which);
      if (keycode === SPACE_KEY_CODE) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const {
      style,
      children,
      isDropped,
      overlayStyle,
      overlay,
    } = this.props;
    return (
      <div
        className="dropdown-component-wrapper"
        style={style}
        ref={this.dropdownWrapperRef}
      >
        {/* потенциально верска может быть невалидной, но у нас зато есть accesibility */}
        <button
          className="dropdown-component__control"
          onClick={() => this.onToggle(TOGGLE_SOURCES.control)}
          onKeyUp={handleKeyUp}
          type="button"
          tabIndex={-1}
        >
          {children}
        </button>

        {
          isDropped
          && (
            <div
              className="dropdown dropdown-component"
              style={overlayStyle}
            >
              {overlay}
            </div>
          )
        }
      </div>
    );
  }
}

export default Dropdown;
