import React, { Fragment } from 'react'
import '../styles/style.css'
function Footer({notes,deleteAll,clearDone}) {
    let count = notes.filter((e)=> 
        e.done == true
    ).length
  return (
    <div class='footer'>
        {notes.length > 0 && (<>
          <div>
      <button onClick={deleteAll} disabled={0 == notes.length}>Delete All</button>
      <button onClick={clearDone} disabled={count == 0}>Clear Done</button>
      </div>
      <div>
        {notes.length > 0 && (
              <>
                {" "}
                <span>
                  You have {notes.length} note{notes.length > 1 && "s"}
                </span>
                <br />
                <span>
                  You have done {count} note{count > 1 && "s"}
                </span>
                <br />
                <span>
                  {" "}
                  {notes.length - count == 0
                    ? "All the work done "
                    : `${notes.length - count} Left`}
                </span>
              </>
            )}
            </div>
            </>
            )}
    </div>
  )
}

export default Footer