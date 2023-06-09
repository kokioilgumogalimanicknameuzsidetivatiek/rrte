import { Editor } from '@tiptap/core';
import classes from './youtube.component.module.scss';
import { YoutubeAttributes } from './node';
import { useEffect, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';
import YouTubeLite from 'react-lite-youtube-embed';

type YoutubeNode = {
  attrs: YoutubeAttributes & { id: string };
};

export const YoutubeComponent = ({
  editor,
  node,
  selected,
}: {
  editor: Editor;
  node: YoutubeNode;
  selected: boolean;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const customWidth = node.attrs.customWidth;
  const isEditMode = editor.isEditable;

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'youtube' && node.attrs.id === nodeId) {
          const { from, to } = editor.state.selection;
          if (from <= pos && to >= pos) {
            setIsSelected(true);
            return false;
          }
          setIsSelected(false);
          return false;
        }
      });
      return true;
    };

    editor.on('selectionUpdate', func);

    return () => {
      editor.off('selectionUpdate', func);
    };
  }, [node.attrs.id]);

  return (
    <NodeView
      isEditable={editor.isEditable}
      selected={showSelection}
      draggable
      className={classNames({
        [classes.left]: alignment === 'left',
        [classes.center]: alignment === 'center',
        [classes.right]: alignment === 'right',
      })}
      style={{
        width: `min(${isCustomSizeEnabled ? customWidth : node.attrs.defaultWidth}px, 100%)`,
      }}
    >
      <div
        data-testid="youtube-comp"
        className={classes.videoContainer}
        style={{
          width: `min(${isCustomSizeEnabled ? customWidth : node.attrs.defaultWidth}px, 100%)`,
        }}
      >
        <YouTubeLite
          id={node.attrs.videoId}
          iframeClass={classes.youtubeVideo}
          title="YouTube video player"
          noCookie
          aspectHeight={9}
          aspectWidth={16}
        />
        {isEditMode && <div className={classes.blocker} />}
      </div>
    </NodeView>
  );
};
