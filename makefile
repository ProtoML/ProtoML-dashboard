OSFLAGS = -Wall -g $(DEBUG)
compile = go build -o $(2) $(1)

%.exe: %.go
	$(call compile,$<,$@)

default:
	echo "Nothing to do here"

clean::
	rm *.exe
