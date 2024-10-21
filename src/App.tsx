import Game from "./components/Game/Game"

const App = () => {
  return (
    <div className="bg-backgroundColor h-screen w-screen overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto flex flex-col justify-start items-center">
        <h1 className="mt-4 text-headerColor font-semibold text-3xl md:text-4xl xl:text-6xl">Tic Tac Toe</h1>
        
        <Game />
      </div>
    </div>
  )
}

export default App
