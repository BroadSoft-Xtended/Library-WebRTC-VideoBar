SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

JADE_FILES := $(shell glob-cli "templates/**/*.jade")
STYLUS_FILES := $(shell glob-cli "styles/**/*.styl")

all: node_modules/bdsft-webrtc-templates.js node_modules/bdsft-webrtc-styles.js node_modules/views

node_modules/views: lib/views
	ln -sf ../lib/views node_modules/views

## Compile styles ##################################################################
styles/css: $(STYLUS_FILES)
	stylus --include-css styles/videobar.styl -o styles

styles/min.css: styles/css
	cssmin styles/*.css > styles/videobar.min.css

node_modules/bdsft-webrtc-styles.js: styles/min.css
	node_modules/webrtc-core/scripts/export-style styles/videobar.min.css node_modules/bdsft-webrtc-styles.js

## Compile jade templates #########################################################
node_modules/bdsft-webrtc-templates.js: $(JADE_FILES)
	templatizer -d templates -o node_modules/bdsft-webrtc-templates.js
