import { useOutletContext } from 'react-router-dom';
import './index.scss';
import WindowHeader, { WindowHeaderActionConfig, WindowHeaderTitleConfig } from '@/components/WindowHeader';
import { IChatCardProps } from '@/components/ChatCard';
import Message from '@/components/Message';
import InputPanel from '@/components/InputPanel';
import { useLayoutEffect, useRef, useState } from 'react';

export interface IChatProps {
  chatCardProps: IChatCardProps,
  isFullScreen: boolean,
  handleToggleFullScreen: Function,
  handleClickEdit: Function,
  handleClickSendMessage: Function,
}

/**
 * 元素滚动至底部
 */
const scrollToBottom = (
  element: HTMLElement | null,
) => {
  if (!element) {
    return;
  }

  element.scrollTop = element.scrollHeight - element.clientHeight;
}

/**
 * chat 二级路由，参数无法从函数中直接获取
 * 需要使用 {@link useOutletContext} 获取
 */
const Chat: React.FC = () => {

  const { 
    chatCardProps,
    isFullScreen,
    handleToggleFullScreen,
    handleClickEdit,
    handleClickSendMessage,
  } = useOutletContext() as IChatProps;

  const messageListRef = useRef<HTMLDivElement>(null);

  // 当消息列表变化时滚动至底部
  useLayoutEffect(() => {
    scrollToBottom(messageListRef.current);
  }, [chatCardProps.messageList]);

  const titleConfig: WindowHeaderTitleConfig = { 
    primaryTitle: chatCardProps.title,
    secondaryTitle: `共 ${chatCardProps.messageList.length - 1} 条对话`,
    isPrimaryTitleClickable: true,
    handleClickPrimaryTitle: handleClickEdit,
  };

  const actionConfigs: WindowHeaderActionConfig[] = [
    {
      iconName: 'edit',
      handleClickAction: () => handleClickEdit(),
    },
    {
      iconName: isFullScreen ? 'fullscreen-exit' : 'fullscreen',
      handleClickAction: () => handleToggleFullScreen(),
    },
  ];

  const messageData = 
    chatCardProps
      .messageList
      .map(msg => {
    return (
      <Message
        key={msg.fingerprint}
        message={msg}
      />
    );
  });

  return (
    <>
      <WindowHeader
        titleConfig={titleConfig}
        actionConfigs={actionConfigs}
      />
      <div 
        ref={messageListRef}
        className='chat-body'>
        {messageData}
      </div>
      <InputPanel
        handleClickSendMessage={handleClickSendMessage}
        onTextAreaFocused={() => scrollToBottom(messageListRef.current)}
      />
    </>
  );
};

export default Chat;