{
    init: function(elevators, floors) {
        for (var floornumber = 0; floornumber < floors.length;floornumber++)
        {
            floors[floornumber].on("up_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?
                var elevator = elevators[0];
                var queue = 999;

                for (var i = 0 ; i < elevators.length; i++)
                {
                    if (isNaN(elevators[i].destinationQueue.length) || elevators[i].destinationQueue.length < queue)
                    {
                        elevator = elevators[i];
                        queue = elevators[i].destinationQueue.length;
                    }   
                }

                elevator.goToFloor(this.floorNum());
            });

            floors[floornumber].on("down_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?
                var elevator = elevators[0];
                var queue = 999;

                for (var i = 0 ; i < elevators.length; i++)
                {
                    if (isNaN(elevators[i].destinationQueue.length) ||elevators[i].destinationQueue.length < queue)
                    {
                        elevator = elevators[i];
                        queue = elevators[i].destinationQueue.length;
                    }   
                }

                elevator.goToFloor(this.floorNum());
            });        
        }

        for (var elevatornumber = 0; elevatornumber < elevators.length;elevatornumber++)
        {
            elevators[elevatornumber].on("floor_button_pressed", function(floorNum) {
                // Maybe tell the elevator to go to that floor?
                if (this.destinationQueue.indexOf(floorNum)<0)
                    this.goToFloor(floorNum);
            });

            elevators[elevatornumber].on("passing_floor", function(floorNum) {
                // Maybe tell the elevator to go to that floor?
                if (this.destinationQueue.indexOf(floorNum)>=0)
                {
                    this.goToFloor(floorNum,true);
                }
            });

            elevators[elevatornumber].on("stopped_at_floor", function(floorNum) {
                // Maybe tell the elevator to go to that floor?
                if (this.destinationQueue.indexOf(floorNum)>=0)
                {
                    this.destinationQueue.splice(this.destinationQueue.indexOf(floorNum),1);
                    this.checkDestinationQueue();
                }
            });            
        };
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
