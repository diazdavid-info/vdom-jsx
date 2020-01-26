import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push($node => {
            $node.setAttribute(k, v);
            return $node;
        });
    }
    for (const k in oldAttrs) {
        if (!(k in newAttrs)) {
            patches.push($node => {
                $node.removeAttribute(k);
                return $node;
            });
        }
    }

    return $node => {
        for (const patch of patches) {
            patch($node);
        }
        return $node;
    };
};

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });

    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(newVChildren));
            return $node;
        });
    }

    return $parent => {
        $parent.childNodes.forEach(($child, i) => {
            childPatches[i]($child);
        });

        for (const patch of additionalPatches) {
            patch($parent);
        }
        return $parent;
    };
};

const diff = (oldVTree, newVTree) => {
    if (newVTree === undefined) {
        return $node => {
            $node.remove();
            return undefined;
        }
    }

    if (typeof oldVTree === 'string' ||
        typeof newVTree === 'string') {
        if (oldVTree !== newVTree) {
            return $node => {
                const $newNode = render(newVTree);
                $node.replaceWith($newNode);
                return $newNode;
            };
        } else {
            return $node => $node;
        }
    }

    if (oldVTree.type !== newVTree.type) {
        return $node => {
            const $newNode = render(newVTree);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }

    const patchAttrs = diffAttrs(oldVTree.props, newVTree.props);
    const patchChildren = diffChildren(oldVTree.child, newVTree.child);

    return $node => {
        patchAttrs($node);
        patchChildren($node);
        return $node;
    };
};

export default diff;