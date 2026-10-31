import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';  
import { ClassicEditor } from 'ckeditor5';               

const RichTextEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      onReady={() => {
        console.log('Editor ready');
      }}
      onChange={() => {
        console.log('Editor content changed');
      }}
      onBlur={() => {
        console.log('Editor blur');
      }}
      onFocus={() => {
        console.log('Editor focus');
      }}
    />
  );
};

export default RichTextEditor;