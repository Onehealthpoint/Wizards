export const CartLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 800 800"
        strokeWidth="10"
        stroke="currentColor"
        className="w-52 h-52 text-blue-500"
      >
        <path
          d="M100.58,30.35,91.72,47,2,30.35,12.76,2l96.88,15.62L225.31,677.28H347.42c-55.09,0-52.69,85.94,0,85.94,62.32,0,62.32-86,1.22-86H638.48c-48.46,0-62.58,86,0,86,42.93,0,59.54-85.79.93-86.07h95.88V655.09H232.4l-38.77-218.8h454.9l80.58-257.81L567.39,156.32,560.74,382.8l-25.08-.19,7.42-229.42L302.65,119.77v258.4H275V110.91L122.09,85.43"
          className="animate-drawCart"
          style={{
            strokeDasharray: 5800, // Set to total path length
            strokeDashoffset: 5800, // Set to total path length
          }}
        />
      </svg>
    </div>
  );
};

export const UserLoader = () => {
  return (
    <div className="mx-auto my-auto">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100" 
        height="100" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 0 0-16 0"/>
      </svg>
    </div>
  );
};