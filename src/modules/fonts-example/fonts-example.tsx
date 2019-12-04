import React from 'react';
import './Fonts.scss';


class FontsExample extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <div style={{ backgroundColor: '#ffffff', width: '50%' }}>
          <p style={{ padding: 5 }} className="Header_32-40_Black">Header_32-40_Black</p>
          <p style={{ padding: 5 }} className="Subheader_14-24_Black">Subheader_14-24_Black</p>
          <p style={{ padding: 5 }} className="Subheader_14-24_Gray">Subheader_14</p>
          <p style={{ padding: 5 }} className="Text_14-24_Black">Text_14-24_Black</p>
          <p style={{ padding: 5 }} className="Comment_12-16">Comment_12-16</p>
          <p style={{ padding: 5 }} className="Link_14-24">Link_14-24</p>
          <p style={{ padding: 5 }} className="Link_12-16">Link_12-16</p>
          <p style={{ padding: 5 }} className="Mono_14-24_Black">Mono_14-24_Black</p>
          <p style={{ padding: 5 }} className="Additional-Header_28-40_Black">Additional-Header_28-40_Black</p>
          <p style={{ padding: 5 }} className="Comment_12-16">Comment_12-16</p>
        </div>
        <div style={{ backgroundColor: '#222222', width: '50%', height: '100vh' }}>
          <p style={{ padding: 5 }} className="Header_32-40_White">Header_32-40_White</p>
          <p style={{ padding: 5 }} className="Subheader_14-24_White">Subheader_14-24_White</p>
          <p style={{ padding: 5 }} className="Text_14-24_White">Text_14-24_White</p>
          <p style={{ padding: 5 }} className="Comment_12-16">Comment_12-16</p>
          <p style={{ padding: 5 }} className="Link_14-24">Link_14-24</p>
          <p style={{ padding: 5 }} className="Link_12-16">Link_12-16</p>
          <p style={{ padding: 5 }} className="Mono_14-24_White">Mono_14-24_White</p>
          <p style={{ padding: 5 }} className="Additional-Header_28-40_White">Additional-Header_28-40_White</p>
          <p style={{ padding: 5 }} className="Comment_12-16">Comment_12-16</p>
        </div>
      </div>
    );
  }
}

export default FontsExample;
