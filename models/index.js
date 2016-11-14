var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
	    title: {
	        type: Sequelize.STRING, allowNull: false
	    },
	    urlTitle: {
	        type: Sequelize.STRING, allowNull: false
	    },
	    content: {
	        type: Sequelize.TEXT, allowNull: false, defaultValue: 'no content yet!'
	    },
	    status: {
	        type: Sequelize.ENUM('open', 'closed'), defaultValue: 'closed'
	    },
	    date: {
	        type: Sequelize.DATE,
	        defaultValue: Sequelize.NOW
	    }
	}, {
		getterMethods:{
			address: function(){
				return `/wiki/ ${this.urlTitle}`
			}
		}
	}
);


var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};