import { BlurView } from "expo-blur";
const PopupForm = ({ children, showForm }) => {
  return (
    <BlurView
      intensity={50}
      blurReductionFactor={100}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-[90%] h-[400px] z-10 justify-start items-start absolute top-[95px] left-[5%] bg-gray-900/60 overflow-hidden rounded-md border-gray-600/50 border-solid border-[1px] p-0 ${
        showForm ? "flex" : " hidden"
      } `}
    >
      {children}
    </BlurView>
  );
};

export default PopupForm;
