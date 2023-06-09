import chatBotIcon from "./asset/image/chatbot.png";
import Button from "./component/Button";
import timerIcon from "./asset/image/chronometer.png";
import expandIcon from "./asset/image/expand.png";
import flashCardIcon from "./asset/image/flash-cards.png";
import todolistIcon from "./asset/image/to-do-list.png";
import moreIcon from "./asset/image/more.png";
import quoteIcon from "./asset/image/quote.png";
import PomodoroTimer from "./component/PomodoroTimer";
import TodoList from "./component/TodoList";
import { useRef, useState } from "react";
import BottomBar from "./component/BottomBar";
import Background from "./component/Background";
import Quote from "./component/Quote";
import FlashCard from "./component/flashcard/FlashCard";
import UserDropDown from "./component/UserDropDown";
import { MyContextProvider } from "./context/MyContext";
import Chatbot from "react-chatbot-kit";
import config from "./component/chatbot/config";
import ActionProvider from "./component/chatbot/actionProvider";
import MessageParser from "./component/chatbot/messageParser";
import "react-chatbot-kit/build/main.css";
const expandOnClickHandler = (event) => {
  const root = document.getElementById("root");
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    root.requestFullscreen();
  }
};


function App() {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState({
    id: 2,
    url: "https://cdn.pixabay.com/vimeo/312432035/pet-20830.mp4?width=1920&hash=0f60ccc6c08d9864f751809addc7245992cc8284",
    name: "cat sleeping",
    theme: "animal",
  });
  const timerRef = useRef();
  const todoRef = useRef();
  const quoteRef = useRef();
  const videoRef = useRef();
  const backgroundRef = useRef();
  const dropDownRef = useRef();
  const dialogRef = useRef();
  const [isFlashcardLoaded, setIsFlashcardloaded] = useState(false);
  const onToggleHandler = (ref) => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
    } else {
      ref.current.classList.add("hidden");
    }
  };
  const changeVideoHandler = (link) => {
    setVideoUrl(link);
  };
  const onVideoLoaded = () => {
    setVideoLoading(false);
  };
  const onSetStateHandler = (func) => {
    func((prev) => !prev);
  };

  return (
    <MyContextProvider>
      <div>
        {videoLoading && (
          <div className="absolute -z-10 top-0 left-0 h-full w-full bg-slate-700 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
          </div>
        )}
        <video
          ref={videoRef}
          onLoadedData={onVideoLoaded}
          key={videoUrl.id}
          autoPlay
          loop
          muted
          className="absolute -z-10 top-0 left-0 h-full w-full object-cover"
        >
          <source src={videoUrl.url} type="video/mp4" />
          This video is no longer exist
        </video>

        <div className="absolute top-5 right-5 flex space-x-5 opacity-80">
          <Button
            iconSrc={quoteIcon}
            description="Daily&nbsp;Quotes"
            onClickHandler={() => onToggleHandler(quoteRef)}
          />

          <Button
            iconSrc={flashCardIcon}
            description="Flashcard"
            onClickHandler={() => onSetStateHandler(setIsFlashcardloaded)}
          />
          <Button
            iconSrc={todolistIcon}
            description="Todo&nbsp;Lists"
            onClickHandler={() => onToggleHandler(todoRef)}
          />
          <Button
            iconSrc={timerIcon}
            description="Timer"
            onClickHandler={() => onToggleHandler(timerRef)}
          />
          <Button
            iconSrc={expandIcon}
            description="Expand"
            onClickHandler={expandOnClickHandler}
          />

          <div className="relative ">
            <Button
              iconSrc={moreIcon}
              description="More"
              onClickHandler={() => onToggleHandler(dropDownRef)}
            />

            <div ref={dropDownRef} className="absolute top-14 right-0 hidden">
              <UserDropDown />
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-80">
          <BottomBar
            onRemoveBackgroundHandler={() => onToggleHandler(backgroundRef)}
          />
        </div>
        <div
          ref={timerRef}
          className="opacity-80 absolute top-24 right-5 -z-10"
        >
          <PomodoroTimer onRemoveHandler={() => onToggleHandler(timerRef)} />
        </div>
        <div ref={todoRef} className="absolute right-5 top-72 opacity-80 ">
          <TodoList onRemoveHandler={() => onToggleHandler(todoRef)} />
        </div>
        <div ref={backgroundRef} className="opacity-80 absolute ">
          <Background
            videoUrl={videoUrl}
            videoRef={videoRef}
            onRemoveHandler={() => onToggleHandler(backgroundRef)}
            changeVideoUrl={changeVideoHandler}
            resetVideoLoading={setVideoLoading}
          />
        </div>
        <div
          ref={quoteRef}
          className="absolute top-[39rem] right-5 opacity-80 "
        >
          <Quote onRemoveHandler={() => onToggleHandler(quoteRef)} />
        </div>
        {isFlashcardLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80">
            <FlashCard
              onRemoveHandler={() => onSetStateHandler(setIsFlashcardloaded)}
            />
          </div>
        )}
        <div className="absolute bottom-5 right-5">
          <div className="opacity-80" onClick={() => onToggleHandler(dialogRef)}>
            <Button iconSrc={chatBotIcon} description="Chatbot" isTop={true} />
          </div>
          <div className="absolute -top-[32rem] right-0 z-50 ">
            <div ref={dialogRef} className="hidden">
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
            </div>
          </div>
        </div>
      </div>
    </MyContextProvider>
  );
}

export default App;
