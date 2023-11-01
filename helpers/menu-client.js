
const getMenu = (role = 'USER_ROLE') => {

    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            children: [
                { title: 'Main', path: '/' },
                { title: 'Progress Bar', path: 'progress' },
                { title: 'Gráficas', path: 'grafica1' },
                { title: 'Promesas', path: 'promises' },
                { title: 'RxJS', path: 'rxjs' }
            ]
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            children: [
                { title: 'Hospitals', path: 'hospitals' },
                { title: 'Doctors', path: 'doctors' },
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].children.unshift({ title: 'Users', path: 'users' })
    }

    return menu;
}

module.exports = {
    getMenu
}