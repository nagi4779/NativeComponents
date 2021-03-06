import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NativeControl from "../Interfaces/NativeControl";
import NativeItemDetail from './NativeItemDetail';
import StyleConfig from '../assets/StyleConfig/index';
import {Actions} from 'react-native-router-flux';
interface ListProps extends NativeControl {
    groupKey: string,
    itemKey: any,
    onClick: (e: any) => void,
    actionLinks: any,
    itemsSource: Array<any>,
    groupsSource?: Array<any>;
    groupId: string,
    groupText: string,
    expandable: boolean,
    noDataText: string,
    emptyListClassName: string,
    itemStyle: {},
    subItemStyle: {},
    titleText: {},
    titleBlackText: {},
    detailText: {}
}

export default class NativeList extends React.Component<ListProps> {
    constructor(props) {
        super(props)
        let data = [];
        for (let ind in props.itemsSource) {
            let obj = props.itemsSource[ind]
            obj['expanded'] = obj.hasOwnProperty('items')
            data.push(obj)
        }
        this.state = {
            data,
            selectedItem:data[0].items[0]
        }
    }

    handleClick = (item): void => {
        if(StyleConfig.isTab){
            this.setState({selectedItem:item})
        } else {
            Actions.push('item_detail',{item})
        }
    }

    _onExpand = (item, ind) => {
        if (item.hasOwnProperty('items')) {
            let {data} = this.state
            data[ind]['expanded'] = !data[ind]['expanded']
            this.setState({data})
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {StyleConfig.isTab ? this.renderTabView() : this.renderList()}
            </View>
        );
    }

    renderList = () => {
        const {itemParent, subItemParent, titleThemeText, titleBlackText, detailText} = styles;
        let { data, selectedItem } = this.state ;
        return (
            <FlatList
                data={data}
                extraData={this.state}
                style={{flex: 1}}
                renderItem={({item, index}) => (
                    <View>
                        <TouchableOpacity
                            onPress={() => this._onExpand(item, index)}
                            style={itemParent} key={index}>
                            <Text style={{fontSize: StyleConfig.countFontSize(16)}}>{item.acType}</Text>
                        </TouchableOpacity>
                        {item.expanded === true && item.hasOwnProperty('items') && item.items.map((subItem, subIndex) => (
                            <TouchableOpacity key={subIndex+''+ subIndex} onPress={() => this.handleClick(subItem)}
                                              style={[subItemParent,{backgroundColor: subItem === selectedItem && StyleConfig.isTab ? '#dcdcfc' : '#fff' }]} key={subIndex + '' + subIndex}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={titleThemeText}>{subItem.name}</Text>
                                    <View style={{flex: 1}}/>
                                    <Text style={titleBlackText}>{subItem.balance}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 2}}>
                                    <Text style={detailText}>{subItem.xType}</Text>
                                    <View style={{flex: 1}}/>
                                    <Text
                                        style={detailText}>{subItem.availableType === '' ? subItem.outStanding : subItem.availableType + ' Balance'}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

            />
        )
    }

    renderTabView = () => {
        return (<View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: StyleConfig.responsiveWidth(40), borderRightWidth:1, borderColor:'#ddd'}}>
                {this.renderList()}
            </View>
            <View style={{width: StyleConfig.responsiveWidth(60)}}>
                <NativeItemDetail itemDetail={this.state.selectedItem} />
            </View>
        </View>)

    }

}

const styles = StyleSheet.create({
    itemParent: {backgroundColor: '#E8E8E8', padding: StyleConfig.countFontSize(8)},
    subItemParent: {
        padding: StyleConfig.countFontSize(12),
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    titleThemeText: {
        fontSize: StyleConfig.countFontSize(20),
        color: '#4B759B'
    },
    titleBlackText: {
        fontSize: StyleConfig.countFontSize(20),
        color: 'black'
    },
    detailText: {
        fontSize: StyleConfig.countFontSize(15),
        color: 'black'
    }
});
