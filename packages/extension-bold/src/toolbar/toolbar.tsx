import type { RegularButtonConfig } from '@rrte/common';
import BoldIcon from './bold.icon.svg';
import { BoldMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('bold');
  return (
    <button
      aria-label="bold"
      data-testid="bold-button"
      className={classNames(classes.boldButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
      disabled={!editor.can().toggleBold()}
    >
      <BoldIcon
        height={'10px'}
        width={'10px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: BoldMark.name,
  text: 'Bold',
  type: 'icon' as const,
  priority: 98,
};
