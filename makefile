
ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile/makefile

$(currentReleasePath)/%.cjs: babelFlag += --env-name commonjs --keep-file-extension
$(currentReleasePath)/%.js: babelFlag += --env-name esmodule --keep-file-extension
