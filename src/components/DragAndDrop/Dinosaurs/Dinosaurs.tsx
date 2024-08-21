import './Dinosaurs.css';
import PlayerMat from './PlayerMat';

const actionsMat = ['freeStego', 'freeBrach', 'freeVelo', 'freeAlo', 'marketHerb', 'marketCarn', 'marketSupply',
  'contract', 'contractFood', 'moveBarrierAndDino', 'threeBarriersForSupplies', 'researchFood',
  'contractSupply', 'barrierAndSupply', 'barriersForSupply', 'barrier', 'firstAndMoveBarrier', 'researchSupplies',
  'resourceAll', 'resourceHerb', 'resourceHerbCarn', 'resourceCarn', 'resourceCarnSupply', 'resoruceSupplies', 'resourceHerbSuply', 'researchForDino'
]

const colors = ['lightblue', 'lightgreen', 'orange', 'pink']

const Dinosaurs = () => {

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rancher = event.dataTransfer.getData("rancher");
    console.log(`Drop - rancher: ${rancher} on ${event.currentTarget.id}`);
    const droppedRancherElement = document.getElementById(rancher);

    if (droppedRancherElement) {
      event.currentTarget.appendChild(droppedRancherElement);
    } else {
      console.error('Element not found:', rancher);
    }
  }

  return (
    <main className="flex flex-col items-center mt">
      <div className="action-mat">
        {
          actionsMat.map((action) => {
            return (<div
              id={action}
              key={`action-square ${action}`}
              className={`action-square ${action}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
            </div>)
          })
        }
      </div>

      <div className="ranchers">

      </div>
      <div className="player-mats">
        {colors.map((color) => {
          return (
            <PlayerMat
              key={`player-mat ${color}`}
              className={`player-mat ${color}`}
              color={color}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />)
        })}
      </div>

      {/* <Button gradientMonochrome="cyan" className="mt-3" onClick={resetState}>Reset <HiRefresh className="ml-2 h-5 w-5" /></Button> */}
    </main >
  );
}
export default Dinosaurs;