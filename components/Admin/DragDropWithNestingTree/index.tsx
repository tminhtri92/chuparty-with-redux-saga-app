import React, { Component } from "react"
import styled from "styled-components"
import Navigation, { AkNavigationItem } from "@atlaskit/navigation"
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down"
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right"
import Button from "@atlaskit/button"
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree"
import _ from "lodash"

import AddMenuModal from "../Menu/AddMenuModal"
import EditAndRemoveMenuModal from "../Menu/EditAndRemoveMenuModal"

const complexTree = {
  data: {
    rootId: "1",
    items: {
      "1": {
        id: "1",
        children: [
          "1-0",
          "1-4",
          "1-7",
          "1-6",
          "1-1",
          "1-3",
          "1-5",
          "1-8",
          "1-9",
        ],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: "Title 1",
        },
      },
      "1-0": {
        id: "1-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-0",
        },
      },
      "1-1": {
        id: "1-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-1",
        },
      },
      "1-2": {
        id: "1-2",
        children: ["1-2-0", "1-2-1", "1-2-2", "1-2-3"],
        hasChildren: true,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2",
        },
      },
      "1-2-0": {
        id: "1-2-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-0",
        },
      },
      "1-2-1": {
        id: "1-2-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-1",
        },
      },
      "1-2-2": {
        id: "1-2-2",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-2",
        },
      },
      "1-2-3": {
        id: "1-2-3",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-3",
        },
      },
      "1-3": {
        id: "1-3",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-3",
        },
      },
      "1-4": {
        id: "1-4",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-4",
        },
      },
      "1-5": {
        id: "1-5",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-5",
        },
      },
      "1-6": {
        id: "1-6",
        children: ["1-6-0", "1-6-1", "1-6-2", "1-6-3", "1-6-4"],
        hasChildren: true,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 6",
        },
      },
      "1-6-0": {
        id: "1-6-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 6-0",
        },
      },
      "1-6-1": {
        id: "1-6-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 6-1",
        },
      },
      "1-6-2": {
        id: "1-6-2",
        children: ["1-6-2-0", "1-6-2-1", "1-6-2-2"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: "Title 2",
        },
      },
      "1-6-2-0": {
        id: "1-6-2-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-0",
        },
      },
      "1-6-2-1": {
        id: "1-6-2-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-1",
        },
      },
      "1-6-2-2": {
        id: "1-6-2-2",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 2-2",
        },
      },
      "1-6-3": {
        id: "1-6-3",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 6-3",
        },
      },
      "1-6-4": {
        id: "1-6-4",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 6-4",
        },
      },
      "1-7": {
        id: "1-7",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-7",
        },
      },
      "1-8": {
        id: "1-8",
        children: ["1-2"],
        hasChildren: true,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Title 1-8",
        },
      },
      "1-9": {
        id: "1-9",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: "Atlassy",
        },
      },
    },
  },
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Item = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`

const EditButton = styled(Button)``

type State = {
  tree: TreeData
  dataEditAndRemoveMenuModal: any
}

export default class DragDropWithNestingTree extends Component<void, State> {
  state = {
    tree: this.props.data,
    dataEditAndRemoveMenuModal: {
      isShow: false,
      item: null,
    },
  }

  componentDidMount() {
    console.log(this.props.data)
    console.log(Object.entries(this.props.data.items).length)
  }

  componentDidUpdate() {
    console.log(this.state.tree)
  }

  static getIcon(
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void
  ) {
    if (item.children && item.children.length > 0) {
      return item?.isExpanded ? (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onCollapse(item.id)}
        >
          <ChevronDownIcon
            label=""
            size="medium"
            onClick={() => onCollapse(item.id)}
          />
        </Button>
      ) : (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onExpand(item.id)}
        >
          <ChevronRightIcon
            label=""
            size="medium"
            onClick={() => onExpand(item.id)}
          />
        </Button>
      )
    }
    return (
      <>
        <Dot>&bull;</Dot>
      </>
    )
  }

  handleAddMenuModalCallback = (callbackData) => {
    this.addDataToTree(callbackData)
  }

  addDataToTree = (name) => {
    const rootId = this.state.tree.rootId
    const itemsList = this.state.tree.items
    const itemRoot = itemsList[rootId]
    const index = Object.entries(this.state.tree.items).length

    const newMenuItem = {
      id: `1-${index + 1}`,
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: name,
      },
    }
    itemRoot.children.push(`1-${index + 1}`)

    console.log({
      ...this.state.tree,
      items: {
        ...this.state.tree.items,
        [`1-${index + 1}`]: newMenuItem,
      },
    })

    this.setState({
      tree: {
        ...this.state.tree,
        items: {
          ...this.state.tree.items,
          [`1-${index + 1}`]: newMenuItem,
        },
      },
    })
  }

  handleOnClickItem = (item) => {
    this.setState({
      dataEditAndRemoveMenuModal: {
        isShow: true,
        item,
      },
    })
  }

  handleEditAndRemoveMenuModalCallback = (callbackData) => {
    console.log(callbackData)
    switch (callbackData.action) {
      case "edit":
        this.editDataFromTree(callbackData)
      case "remove":
        this.removeDataFromTree(callbackData)

      default:
        break
    }
  }

  editDataFromTree = (item) => {
    const rootId = this.state.tree.rootId
    const itemsList = this.state.tree.items
    const itemRoot = itemsList[rootId]
    const editItem = itemsList[item.item]
    const newMenuItem = {
      ...editItem,
      data: {
        ...editItem.data,
        title: item.data,
      },
    }
    console.log(newMenuItem)
    this.setState({
      tree: {
        ...this.state.tree,
        items: {
          ...this.state.tree.items,
          [newMenuItem.id]: newMenuItem,
        },
      },
    })
  }

  makeARec = (n, a) => (n === 0 ? a : this.makeARec(n - 1, [n, ...a]))

  removeDataFromTree = (item) => {
    const itemsList = this.state.tree.items
    const removeItem = itemsList[item.item]
    const removeItemId = removeItem.id
    const itemsListAsArray = Object.entries(itemsList)
    const parentId = itemsListAsArray
      .map((item) => item[1])
      .filter((item) => item.children.length > 0)
      .find((item) => item.children.includes(removeItemId) === true).id
    const newParentItemChilren = itemsList[parentId].children.filter(
      (item) => item !== removeItemId
    )
    const newItemsList = {
      ...itemsList,
      [parentId]: {
        ...itemsList[parentId],
        children: newParentItemChilren,
      },
    }

    const childrenRemoveItem = removeItem.children

    const childrenOfChildrenList = childrenRemoveItem

    let childrenRemoveItemObj = {
      ...childrenRemoveItem.reduce((ac, a) => ({ ...ac, [a]: a }), {}),
      [removeItemId]: removeItemId,
    }

    const newItemsListAfterRemoveChildren = _.omit(
      newItemsList,
      _.keys(childrenRemoveItemObj)
    )

    // const { [removeItemId]: id, ...newListItem } = newItemsList

    console.log("old", newItemsList)
    console.log(
      "newItemsListAfterRemoveChildren",
      newItemsListAfterRemoveChildren
    )

    this.setState({
      tree: {
        ...this.state.tree,
        items: newItemsListAfterRemoveChildren,
      },
    })
  }

  renderItem = ({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
    return (
      <Item
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>
          {DragDropWithNestingTree.getIcon(item, onExpand, onCollapse)}
        </span>
        <span>{item.data ? item.data.title : ""}</span>
        <EditButton onClick={() => this.handleOnClickItem(item)}>
          Edit
        </EditButton>
      </Item>
    )
  }

  onExpand = (itemId: ItemId) => {
    const { tree }: State = this.state
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: true }),
    })
  }

  onCollapse = (itemId: ItemId) => {
    const { tree }: State = this.state
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: false }),
    })
  }

  onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    const { tree } = this.state

    if (!destination) {
      return
    }

    const newTree = moveItemOnTree(tree, source, destination)
    this.setState({
      tree: newTree,
    })
  }

  render() {
    const { tree } = this.state

    return (
      <>
        <AddMenuModal
          callback={(callbackData) =>
            this.handleAddMenuModalCallback(callbackData)
          }
        />
        <EditAndRemoveMenuModal
          data={this.state.dataEditAndRemoveMenuModal}
          callback={(callbackData) =>
            this.handleEditAndRemoveMenuModalCallback(callbackData)
          }
        />
        <Tree
          tree={tree}
          renderItem={this.renderItem}
          onExpand={this.onExpand}
          onCollapse={this.onCollapse}
          onDragEnd={this.onDragEnd}
          isDragEnabled
          isNestingEnabled
        />
      </>
    )
  }
}
