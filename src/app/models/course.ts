export class Course{
    
    constructor(
        public name : String,
        public idCourse : String,
        public description : String, 
        public level : Number,
        public requirements : String,
        public password : String,
        public imageCourse : String,
        public type : String,
        public topics : [],
        public administrator : [],
        public users : []
    ){}
}