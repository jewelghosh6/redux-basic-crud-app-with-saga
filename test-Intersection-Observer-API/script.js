
//   const createObserver = () => {    
//     const options = {
//         root: null,
//         rootMargin: "0px",
//         threshold: 1.0,
//     };
    
//     const callback = (entries, observer) => {
//         console.log("Callback invoked",entries)
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("in-view");
//           } else {
//             entry.target.classList.remove("in-view");
//           }
//         });
//       };
      
//       const observer = new IntersectionObserver(callback, options);
    
//       observer.observe(document.querySelector("#sixth"));
      
//   };

//   // Set things up
// window.addEventListener(
//     "load",
//     (event) => {
//         console.log(event);
//       createObserver();
//     },
//     false,
//   );
  