import { Input, Layout, Text, Button } from '@ui-kitten/components'
import React from 'react'
import { Platform, StyleSheet, ToastAndroid } from 'react-native'
import DateTimePicker, { DateTimePickerEvent }  from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { updateTodoList } from '../store/apiCall';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AndroidMode = 'date' | 'time';

const UpdateTodoScreen = ({route, navigation}: any) => {

    const insets = useSafeAreaInsets();

    const { item } = route.params;

    const [nameTodo, setNameTodo] = React.useState(item.title)
    const [desTodo, setDesTodo] = React.useState(item.description);
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState("date");
    const [time, setTime] = React.useState(item.time);
    const [day, setDay] = React.useState(item.day);
    const dispatch = useDispatch();

    const showMode = (sh: boolean, currentMode: string) => {
        setShow(sh);
        setMode(currentMode);
    }

    const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        if (mode === "time") {
            const hour = tempDate.getHours() < 10 ? `0${tempDate.getHours()}`: `${tempDate.getHours()}`
            const minute = tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}`: `${tempDate.getMinutes()}`
            setTime(tempDate.getHours() + ':' + tempDate.getMinutes());
        } else {
            const month = (tempDate.getMonth() + 1) < 10 ? `0${tempDate.getMonth() + 1}`: `${tempDate.getMonth()}`
            setDay(tempDate.getDate() + '/' + month + '/' + tempDate.getFullYear());
        }
        showMode(false, "date");
    }

    const navigateHome = () => {
        navigation.navigate('Homepage', {
            screen: 'Home',
        })
    }
    
    const handleUpdate = async () => {
        if (nameTodo == '' || desTodo == '' || time == '' || day == '') {
            ToastAndroid.show('Vui lòng điền đẩy đủ tất cả các trường', ToastAndroid.SHORT);
            return;
        }
        try {
            await updateTodoList(dispatch, item._id, nameTodo, desTodo, time, day);
            ToastAndroid.show('Bạn đã sửa việc thành công', ToastAndroid.SHORT);
            navigateHome()
        } catch (error) {
            console.log(error)
        }
        setDate(new Date());
        setNameTodo('');
        setDesTodo('')
        setDay('');
        setTime('');
    }

    return (
        <Layout
            style={[
                styles.container, 
                {
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                }
            ]}
        >
            <Text 
                category='h2'
                style={styles.topText}
            >
                Update Todo
            </Text>
            <Input
                style={styles.mt12}
                label='Name'
                placeholder='Name'
                value={nameTodo}
                onChangeText={nextValue => setNameTodo(nextValue)}
            />
            <Input
                style={styles.mt12}
                label='Description'
                placeholder='Description'
                value={desTodo}
                onChangeText={nextValue => setDesTodo(nextValue)}
            />
            <Input
                style={styles.mt12}
                label='Time'
                placeholder='00:00'
                value={time}
                onChangeText={nextValue => setTime(nextValue)}
                onPressIn={() => showMode(true, "time")}
            />
            <Input
                style={styles.mt12}
                label='Date'
                placeholder='dd/mm/yy'
                value={day}
                onChangeText={nextValue => setDay(nextValue)}
                onPressIn={() => showMode(true, "date")}
            />
            <Button
                style={styles.mt12}
                onPress={handleUpdate}
            >
                UPDATE
            </Button>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode as AndroidMode}
                    display='default'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    topText: {
        textAlign: 'center',
        fontSize: 32,
    },
    mt12: {
        marginTop: 12,
    }
})

export default UpdateTodoScreen;
