
ifeq ($(origin mablung-makefile-path),undefined)
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

$(project-path)/release/%.cjs: babel-flag += --env-name commonjs --keep-file-extension
$(project-path)/release/%.js: babel-flag += --env-name esmodule --keep-file-extension
