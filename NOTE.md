# 2019-01-05
1. TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
    1. 不使用严格的类型检查，即在 tsconfig.json 中设置 "strict": false
    2. 在 tsconfig.json中设置 "noImplicitThis": false
