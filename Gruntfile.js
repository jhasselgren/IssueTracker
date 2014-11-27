
module.exports = function(grunt){
	grunt.initConfig({
		copy: {
			build: {
				cwd: 'app_src',
				src: ['**', '!**/*.jade', '!js/**/*.js'],
				dest: 'app',
				expand: true
			},
		},

		clean: {
			build: {
				src: [ 'app' ]
			},
		},
		html2js: {
		  main: {
			options: {
				base: 'app_src',
				module: 'app.templates',
				singleModule: true
			},
			src: ['app_src/**/*.tpl.html', 'app_src/**/*.tpl.jade'],
			dest: 'app/js/templates.js'
		  }
		},
		jshint: {
			beforeconcat: ['app_src/js/**/*.js']
		},
		concat: {
			options: {

			},
			dist: {
				src: ['app_src/js/**/*.js'],
				dest: 'app/js/app.js',
			},
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {},
				},
				files: [{
					expand: true,
					cwd: 'app_src',
					src: [ '**/*.jade', '!**/*.tmp.jade' ],
					dest: 'app',
					ext: '.html'
				}]
			},
		},

		//coffee: {
		//	compile: {
		//		options: {
		//		},
		//		files: {
		//			'app/js/app.js' :
		//			[
		//				'app_src/**/*.coffee'
		//			]
		//		}
		//	}
		//},
		watch: {
			jade: {
				files: 'app_src/**/*.jade',
				tasks: [ 'jade', 'html2js' ]
			},
			//coffee: {
			//	files: 'app_src/**/*.coffee',
			//	tasks: ['coffee']
			//},
			concat: {
				files: 'app_src/js/**/*.js',
				tasks: [ 'jshint', 'concat' ]
			},
			copy: {
				files: [ 'app_src/**', '!app_src/**/*.styl', '!app_src/**/*.coffee', '!app_src/**/*.jade', '!app_src/js/**/*.js' ],
				tasks: ['copy']
			}
		},
		connect: {
			server: {
				options:{
					port: 8080,
					base: 'app',
					hostname: '*'
				}
			},
		},
		express: {
		    options: {
		    
		    },
		    dev: {
		      options: {
		        script: 'server.js'
		      }
		    },
	    },
	    shell: {
		    mongodb: {
		        command: 'mongod --dbpath ./data',
		        options: {
		            async: true,
		            stdout: false,
		            stderr: true,
		            failOnError: true,
		            execOptions: {
		                cwd: '.'
		            }
		        }
		    }
		},
	});

	grunt.registerTask(
	  'scripts', 
	  'Compiles the JavaScript files.', 
	  [ 'html2js', 'jshint', 'concat' ]
	);

	grunt.registerTask(
		'build',
		'Compiles all of the assets and copies the files to the build directory.',
		[ 'clean', 'copy', 'jade', 'scripts']
	);

	grunt.registerTask(
		'default',
		'Watches the project for chnages, automatically builds them and runs a server.',
		['build', 'shell:mongodb', 'express:dev', 'watch']
	);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jade');
	//grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-shell-spawn');
};