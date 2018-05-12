
function buyTechUpgrades(){
	var upgrades = document.getElementById("techUpgrades").children;
	for(var i = 0; i < upgrades.length; i++) {
		if(upgrades[i].onclick){
			upgrades[i].onclick();
		}
	};
}

function buyUpgrades(){
	var upgrades = document.getElementById("upgrades").children;
	for(var i = 0; i < upgrades.length; i++) {
		if(upgrades[i].onclick){
			upgrades[i].onclick();
		}
	};
}

var PRODUCT_GAP = 50;

function checkCurrentAchievement(productId){

	var cheapestAchievement = null;
	var currentCost = Math.pow(2, 800);

	for(var i = 0; i < Game.AchievementsById.length; i++){
		var achievement = Game.AchievementsById[i];
		
		if(	achievement.buildingTie == null || 
			achievement.buildingTie.id != productId || 
			achievement.won === 1) { 
				continue;
		}
		
		var cost = getAchievementCost(achievement);

		console.log(`checking achievement > ${achievement.desc} needing ${getBuildingNeeded(achievement)} buildings for ${Beautify(cost)}`);
		if (cost < currentCost) {
			if(cheapestAchievement){
				console.log(`is cheaper then ${cheapestAchievement.desc} by ${cost - currentCost}`);
			}
			cheapestAchievement = achievement
			currentCost = cost;
		}
	}
	return cheapestAchievement;
}

function getBuildingNeeded(achievement) {
	return  achievement.tier == 1 ? 1 : (achievement.tier - 1) * PRODUCT_GAP;
}

function getAchievementCost(achievement){
	var productDiff = getBuildingNeeded(achievement) - achievement.buildingTie.amount;
	var cost = achievement.buildingTie.getSumPrice(productDiff);
	return cost;
}

function buyProducts(){
	console.log(`----------------------`);
	
	var thresholds = [];

	for(var i = 1; i < 10; i++){
		thresholds.push(PRODUCT_GAP*i)
	}

	var cheapestAchievement = null;
	var currentAchievementCost = Math.pow(2, 800);

	for(var j = 0; j < Game.ObjectsById.length; j++) {
		var achievement = checkCurrentAchievement(j);
		if(achievement && getAchievementCost(achievement) < currentAchievementCost){
			currentAchievementCost = getAchievementCost(achievement);
			cheapestAchievement = achievement;
		}
	}	
	
	for(var i = 0; i < thresholds.length; i++){
		var threshold = thresholds[i];
		var completed = 0;
		for(var j = 0; j < Game.ObjectsById.length; j++) {
			var product = Game.ObjectsById[j];
			if(product.amount < threshold){
				var thresholdCost = product.getSumPrice(threshold - product.amount)
				console.log(`threshold cost for ${product.name} is ${Beautify(thresholdCost)} over ${Beautify(currentAchievementCost)} for cheapestAchievement`)
				if(cheapestAchievement && currentAchievementCost < thresholdCost){
					console.log(`trying to get achievement > ${cheapestAchievement.desc} for ${Beautify(currentAchievementCost)}`);
					Game.ObjectsById[cheapestAchievement.buildingTie.id].buy();
				}else{
					console.log(`Buying products to get to ${threshold} for ${product.name}`)
					product.buy();
				}
			}else{
				completed++;
			}
		}
		console.log(`threshold ${threshold} is completed by ${completed} on ${Game.ObjectsById.length}`)
		if(completed != Game.ObjectsById.length){
			break;
		}
	}

}

function popWrinklers(){
	
	if(Game.wrinklers == undefined) { return; }

	for(var i = 0; i < Game.wrinklers.length; i++){
		Game.wrinklers[i].hp = 0;
	}
}

function runHaxor(){
	buyTechUpgrades();
	buyUpgrades();
	buyProducts();
	popWrinklers();

	Game.researchT = 0;
}

runHaxor();