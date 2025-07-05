import { BlurView } from "expo-blur";
const PopupForm = ({ children, showForm }) => {
  return (
    <BlurView
      intensity={50}
      // tint="systemMaterial"
      blurReductionFactor={100}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-[90%] h-[200px] z-10 justify-start items-start absolute top-[95px] left-[5%] bg-gray-900/60 overflow-hidden rounded-md border-gray-900 border-solid border-[2px] p-0 ${
        showForm ? "flex" : " hidden"
      } `}
    >
      {children}
    </BlurView>
  );
};

export default PopupForm;
