import { Button } from "antd";

const LeftOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: boolean, setIsAnimated: Function }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-title font-bold text-white mb-4">
      Vous n{"'"} avez pas de compte ?
      </h1>
      <h5 className="text-lg md:text-xl text-white">Commencez votre voyage en un clic!</h5>
      <div className="mt-8 md:mt-16">
      
        <button 
          className="text-white bg-transparent border-white rounded-full p-2 px-4 border hover:bg-white hover:text-buttonColor transition ease-in-out"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          S{"'"} enregistrer
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
