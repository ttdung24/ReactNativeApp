import { Input, Layout, Text, Button } from '@ui-kitten/components'
import React from 'react'
import { Platform, StyleSheet, ToastAndroid } from 'react-native'
import DateTimePicker, { DateTimePickerEvent }  from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { addTodoList } from '../store/apiCall';

type AndroidMode = 'date' | 'time';

const AddTodoScreen = () => {
    const [nameTodo, setNameTodo] = React.useState('')
    const [desTodo, setDesTodo] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState("date");
    const [time, setTime] = React.useState('');
    const [day, setDay] = React.useState('');
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
            setTime(tempDate.getHours() + ':' + tempDate.getMinutes());
        } else {
            setDay(tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear());
        }
        showMode(false, "date");
    }
    
    const handleAdd = async () => {
        if (nameTodo == '' || desTodo == '' || time == '' || day == '') {
            ToastAndroid.show('Vui lòng điền đẩy đủ tất cả các trường', ToastAndroid.SHORT);
            return;
        }
        try {
            await addTodoList(dispatch, nameTodo, desTodo, time, day);
            ToastAndroid.show('Bạn đã thêm 1 việc thàh công', ToastAndroid.SHORT);
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
            style={styles.container}
        >
            <Text 
                category='h2'
                style={styles.topText}
            >
                Add Todo List
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
                onPress={handleAdd}
            >
                ADD
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

export default AddTodoScreen;
