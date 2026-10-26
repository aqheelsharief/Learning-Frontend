export function MoodBoardItem({ color, image, description }){
  return (
    <div className="mood-board-item" style={{backgroundColor: color}}>
      <img className="mood-board-image" src={image}></img>
      <h3 className="mood-board-text">
        {description}
      </h3>
    </div>
  )
}

export function MoodBoard(){
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        <MoodBoardItem color='red' image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9Y559yrNkkXX7BiguPXko_nnrgwZvzjOB8DNVW8jQbRlAy2KVKcCZY0yaDF50hwcEbCL9ryt7vPVPwwnexq6c0IJsZYc_gQwJTPUN0x2Og&s=10" 
        description="chimpanzee" />
        <MoodBoardItem color='red' image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9Y559yrNkkXX7BiguPXko_nnrgwZvzjOB8DNVW8jQbRlAy2KVKcCZY0yaDF50hwcEbCL9ryt7vPVPwwnexq6c0IJsZYc_gQwJTPUN0x2Og&s=10" 
        description="chimpanzee" />
        <MoodBoardItem color='red' image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9Y559yrNkkXX7BiguPXko_nnrgwZvzjOB8DNVW8jQbRlAy2KVKcCZY0yaDF50hwcEbCL9ryt7vPVPwwnexq6c0IJsZYc_gQwJTPUN0x2Og&s=10" 
        description="chimpanzee" />
      </div>
    </div>
  )
}