import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { SketchPicker } from 'react-color';
import BoldParagraph from '../../componments/Text/BoldParagraph/BoldParagraph';
import Image from '../../componments/Image/Image';
import Button from '../../componments/Button/Button';
import GhostButton from '../../componments/GhostButton';
import UnnumberedListIcon from '../../static/unnumbered-list-icon.svg';
import NumberedListIcon from '../../static/numbered-list-icon.svg';
import './RichTextBox.css';

function RichTextBox({ flashcardData, setFlashcardData, type }) {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
    ],
    content: flashcardData,
    onUpdate: ({ editor }) => {
      setFlashcardData(editor.getHTML());
    },
  });

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    editor.chain().focus().setColor(color.hex).run();
  };

  const iconStyle = {
    margin: "0px",
    width: "32px",
    height: "32px",
    fontSize: "18px",
    marginLeft: "6px",
    marginRight: "6px",
  };

  const renderButton = (command, label, active) => (
    active ? (
      <Button style={iconStyle} text={label} onClick={command} />
    ) : (
      <GhostButton style={iconStyle} text={label} onClick={command} />
    )
  );

  return (
    <div>
      <BoldParagraph text={type} />
      <div className="text-effects">
        {renderButton(() => editor.chain().focus().toggleBold().run(), 'B', editor?.isActive('bold'))}
        {renderButton(() => editor.chain().focus().toggleItalic().run(), 'I', editor?.isActive('italic'))}
        {renderButton(() => editor.chain().focus().toggleUnderline().run(), 'U', editor?.isActive('underline'))}
        {renderButton(() => editor.chain().focus().toggleStrike().run(), 'S', editor?.isActive('strike'))}
        {renderButton(() => editor.chain().focus().toggleBulletList().run(), <Image url={UnnumberedListIcon} width="16px" />, editor?.isActive('bulletList'))}
        {renderButton(() => editor.chain().focus().toggleOrderedList().run(), <Image url={NumberedListIcon} width="16px" />, editor?.isActive('orderedList'))}

        <div className="text-effects">
          <GhostButton style={{ ...iconStyle, backgroundColor: selectedColor }} text="" onClick={() => setShowColorPicker(!showColorPicker)} />
          <p className="selected-color-style">{selectedColor}</p>
          {showColorPicker && (
            <div style={{ position: 'absolute', zIndex: 2 }}>
              <SketchPicker color={selectedColor} onChange={handleColorChange} />
              <div className="text-effects">
                <GhostButton text="Cancel" onClick={() => setShowColorPicker(false)} />
                <Button text="Apply" onClick={() => setShowColorPicker(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
      <EditorContent editor={editor} className="rich-text-box" />
    </div>
  );
}

export default RichTextBox;
