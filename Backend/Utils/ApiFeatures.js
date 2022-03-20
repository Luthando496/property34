class ApiFeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;

    }

    
    search() {
        const keyword = this.queryString.keyword ? {
            location:{
                $regex: this.queryString.keyword,
                $options: 'i'
            }

        }:{}

        console.log({...keyword});
        
        this.query = this.query.find({...keyword});



        return this
    }


    filter(){
        const queryCopy = {...this.queryString}

        const removeFields = ['page','limit','keyword']
        removeFields.forEach(el => delete queryCopy[el]);


        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}` );

        console.log(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr))

        return this

    }
    limitFields() {
        if (this.queryString.fields) {
          const fields = this.queryString.fields.split(',').join(' ');
          console.log(fields)
          this.query = this.query.select(fields);
        } else {
          this.query = this.query.select('-__v');
        }
    
        return this;
    }
    sort() {
        if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(',').join(' ');
          console.log(sortBy)
          this.query = this.query.sort(sortBy);
        } else {
          this.query = this.query.sort('-createdAt');
        }
    
        return this;
      }

    pagination(resPerPage){
        const currPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip)
        return this

    }
}


module.exports = ApiFeatures;