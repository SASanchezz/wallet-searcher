import { useState, useEffect } from "react";

export function MenuContext(props: any) {
  const { children, handleInvestigate } = props;
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const onContextMenu = (e: any) => {
    e.preventDefault();
    setClicked(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
  }


  return (
    <div onContextMenu={onContextMenu}>

      {children}

      {clicked && (
        <div className="context-menu" style={ { top: points.y, left: points.x } }>
          <ul>
            <li onClick = {(handleInvestigate)}>Investigate</li>
          </ul>
        </div>
      )}
    </div>
  );
};