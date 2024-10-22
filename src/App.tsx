import Game from "./components/Game"

const App = () => {
  return (
    <div className="bg-backgroundColor h-screen w-screen overflow-x-hidden overflow-y-auto">
      <div className="container h-full w-full mx-auto flex flex-col justify-start items-center">
        <h1 className="mt-4 text-headerColor font-semibold text-5xl md:text-6xl lg:text-6xl xl:text-[70px]">Tic Tac Toe</h1>
        
        <Game />
      </div>
    </div>
  )
}

export default App
