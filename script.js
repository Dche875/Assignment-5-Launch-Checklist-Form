// Write your JavaScript code here!
 
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/



window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName");
      let copilotNameInput = document.querySelector("input[name=copilotName");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel");
      let cargoMassInput = document.querySelector("input[name=cargoMass");                
         if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
            alert("All fields are required!");
            event.preventDefault();
         } else if(isNaN(pilotNameInput.value) === false || isNaN(copilotNameInput.value) === false) {
            alert("Please enter a valid name for the Pilot and/or Co-pilot field(s).");
            event.preventDefault();
         } else if(isNaN(fuelLevelInput.value) === true || isNaN(cargoMassInput.value) === true) {
            alert("Please enter an appropriate numeric value for the Fuel Level and/or Cargo Mass field(s).");
            event.preventDefault();
         };

      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} ready`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} ready`;

      if(fuelLevelInput.value < 10000) {
         document.getElementById("faultyItems").style.visibility = 'visible';
         document.getElementById("fuelStatus").innerHTML = `Warning: Fuel level too low for launch`;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch!";
         document.getElementById("launchStatus").style.color = "red";
         event.preventDefault();
      }

      if(cargoMassInput.value > 10000) {
         document.getElementById("faultyItems").style.visibility = 'visible';
         document.getElementById("cargoStatus").innerHTML = `Warning: Cargo mass is too high`;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch!";
         document.getElementById("launchStatus").style.color = "red";
         event.preventDefault();
      }

      if(fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch!";
         document.getElementById("launchStatus").style.color = "green";
         event.preventDefault();
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
   response.json().then( function(json) {
      const div = document.getElementById("missionTarget");
         // Add HTML that includes the JSON data
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[4].name}</li>
            <li>Diameter: ${json[4].diameter}</li>
            <li>Star: ${json[4].star}</li>
            <li>Distance from Earth: ${json[4].distance}</li>
            <li>Number of Moons: ${json[4].moons}</li>
         </ol>
         <img src="${json[4].image}">
      `;
    });
});
});
