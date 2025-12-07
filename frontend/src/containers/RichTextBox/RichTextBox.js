import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { SketchPicker } from 'react-color';
import closeOnOutsideClick from '../../hooks/closeOnOutsideClick';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color'; // Add this import
import BoldParagraph from '../../componments/Text/BoldParagraph/BoldParagraph';
import Image from '../../componments/Image/Image';
import Button from '../../componments/Button/Button';
import GhostButton from '../../componments/GhostButton';
import UnnumberedListIcon from '../../static/unnumbered-list-icon.svg';
import NumberedListIcon from '../../static/numbered-list-icon.svg';
import './RichTextBox.css';

function RichTextBox({ flashcardData, setFlashcardData, type, view="desktop" }) {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dropdownRef = useRef(null);

  closeOnOutsideClick(dropdownRef, setShowColorPicker, "BUTTON");

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
      Color, // Add this extension
    ],
    content: flashcardData,
    onUpdate: ({ editor }) => {
      setFlashcardData(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && flashcardData !== editor.getHTML()) {
      editor.commands.setContent(flashcardData);
    }
  }, [flashcardData, editor]);

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

  const renderButton = (command, label, active, style) => (
    active ? (
      <Button style={{...iconStyle, ...style}} text={label} onClick={command} />
    ) : (
      <GhostButton style={{...iconStyle, ...style}} text={label} onClick={command} />
    )
  );

  return (
    <div className="editor-container">
      <BoldParagraph text={type} />
      <div className="text-effects">
        {/* single flex-wrap toolbar so buttons wrap dynamically */}
        <div className="toolbar">
          {renderButton(() => editor.chain().focus().toggleBold().run(), 'B', editor?.isActive('bold'), {fontWeight: "700"})}
          {renderButton(() => editor.chain().focus().toggleItalic().run(), 'I', editor?.isActive('italic'), {fontStyle: "italic"})}
          {renderButton(() => editor.chain().focus().toggleUnderline().run(), 'U', editor?.isActive('underline'), {textDecoration: "underline"})}
          {renderButton(() => editor.chain().focus().toggleStrike().run(), 'S', editor?.isActive('strike'), {textDecoration: "line-through"})}

          <div className="color-picker-wrap" ref={dropdownRef}>
            <GhostButton style={{ ...iconStyle, backgroundColor: selectedColor }} text="" onClick={() => setShowColorPicker(!showColorPicker)} />
            <p className="selected-color-style">{selectedColor}</p>
            {showColorPicker && (
              <div className="color-popover">
                <SketchPicker color={selectedColor} onChange={handleColorChange} />
              </div>
            )}
          </div>

          {renderButton(() => editor.chain().focus().toggleBulletList().run(), <Image url={UnnumberedListIcon} width="16px" minWidth='16px' paddingRight='0px'/>, editor?.isActive('bulletList'))}
          {renderButton(() => editor.chain().focus().toggleOrderedList().run(), <Image url={NumberedListIcon} width="16px" minWidth='16px' paddingRight='0px'/>, editor?.isActive('orderedList'))}
        </div>
      </div>
      <EditorContent editor={editor} className={view === "mobile" ? "rich-text-box-mobile" : "rich-text-box"} />
    </div>
  );
}

export default RichTextBox;
