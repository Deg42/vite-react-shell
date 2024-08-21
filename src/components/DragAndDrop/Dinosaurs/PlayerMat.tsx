import './PlayerMat.css';

interface PlayerMatProps {
    color: string;
    className: string;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const ranchersType = ['lead', 'rancher1', 'rancher2', 'rancher3', 'rancher4']

const PlayerMat: React.FC<PlayerMatProps> = ({ color, className, onDragOver, onDrop }) => {

    const ranchers = ranchersType.map(rancher => `${rancher} ${color}`);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, rancher: string) => {
        event.dataTransfer.setData("rancher", rancher);
    };

    return (
        <div className={className} style={{ backgroundColor: `${color}` }}>
            <div className="a">
                <div className="a1"></div>
                <div className="a2"></div>
                <div className="a3"></div>
                <div className="a4"></div>
                <div className="a5"></div>
                <div className="a6"></div>
                <div className="a7"></div>
            </div>
            <div className="n"></div>
            <div className="b">
                <div className="b1"></div>
                <div className="b2"></div>
                <div className="b3"></div>
                <div className="b4"></div>
                <div className="b5"></div>
            </div>
            <div className="c">
                <div className="d">
                    <div className="f"></div>
                    <div className="g"></div>
                    <div className="h"></div>
                    <div className="i"></div>
                </div>
                <div className="e">
                    <div className={`j ranchers ${color}`}>
                        {ranchers.map((rancher) => (
                            <div
                                id={rancher}
                                key={rancher}
                                className={`rancher ${rancher}`}
                                draggable
                                onDragStart={(event) => handleDragStart(event, rancher)}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                            />
                        ))}
                    </div>
                    <div className="k"></div>
                    <div className="l"></div>
                    <div className="m"></div>
                </div>
            </div>
        </div>
    );
}
export default PlayerMat;