import { faker } from '@faker-js/faker';

export const generateTrafficData = (points = 20) => {
    const data = [];
    const now = new Date();

    for (let i = points; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
        data.push({
            time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
            inbound: faker.number.int({ min: 100, max: 1000 }),
            outbound: faker.number.int({ min: 50, max: 800 })
        });
    }
    return data;
};

export const generateIPActivity = (count = 5) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        ip: faker.internet.ipv4(),
        location: faker.location.country(),
        port: faker.internet.port(),
        status: faker.helpers.arrayElement(['Suspicious', 'Blocked', 'Allowed']),
        timestamp: faker.date.recent().toISOString()
    }));
};

export const generateAlerts = (count = 3) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        title: faker.helpers.arrayElement(['Port scan detected', 'Brute force login attempt', 'Malware communication', 'DDoS suspect traffic']),
        severity: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
        timestamp: faker.date.recent().toISOString(),
        sourceIp: faker.internet.ipv4()
    }));
};

export const getDashboardSummary = () => ({
    systems: faker.number.int({ min: 10, max: 50 }),
    blockedIps: faker.number.int({ min: 100, max: 500 }),
    activeThreats: faker.number.int({ min: 0, max: 5 }),
    totalTraffic: `${faker.number.float({ min: 1, max: 10, fractionDigits: 1 })} GB`
});
