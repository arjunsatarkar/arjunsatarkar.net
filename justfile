all: subst
	cd www && just

subst:
	python3 subst.py
