
ifndef mablung-makefile-path
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

release/%.cjs: babel-parameter += --env-name commonjs
release/%.js: babel-parameter += --env-name esmodule
