declare module Box2D {

    interface Box2D {
        (): Promise<Box2D>;
        HEAPF32: any;
        _malloc(arg0: number);
        b2Contact: b2Contact;
        wrapPointer(ptr: any, wrapAs: any): any;
        JSContactListener: JSContactListener;
        castObject(arg0: any, b2WheelJoint: any);
        b2CircleShape: b2CircleShape;
        b2_kinematicBody: b2_kinematicBody;
        b2_dynamicBody: b2_dynamicBody;
        b2PolygonShape: b2PolygonShape;
        b2BodyDef: b2BodyDef;
        b2Body: b2Body;
        b2Fixture: b2Fixture;
        b2Vec2: b2Vec2;
        b2World: b2World;
        b2_staticBody: b2_staticBody,
        b2RevoluteJoint: b2RevoluteJoint,
        b2RevoluteJointDef: b2RevoluteJointDef
        b2DistanceJoint: b2DistanceJoint,
        b2DistanceJointDef: b2DistanceJointDef,
        b2FixtureDef: b2FixtureDef,
        b2RopeJointDef:b2RopeJointDef,
        b2ChainShape:b2ChainShape
    }

    interface wrapPointer {
        (ptr, wrapas)
    }

    interface _malloc {
        (n:number)
    }

    interface b2ChainShape {
        new():b2ChainShape;
        CreateLoop(vertices:b2Vec2[],count:number);
        CreateChain(vertices:b2Vec2[],count:number);
    }

    interface b2Contact {
        GetFixtureA(): b2Fixture;
        GetFixtureB(): b2Fixture;
    }

    interface JSContactListener {
        PreSolve: () => void;
        PostSolve: () => void;
        EndContact: () => void;
        BeginContact: (contactPtr: any) => void;
        new(): JSContactListener
    }

    interface b2DistanceJoint {
        new(): b2DistanceJoint
    }

    interface b2DistanceJointDef extends b2JointDef {


        set_frequencyHz(arg0: number);
        set_dampingRatio(arg0: number);
        set_length(arg0: number);
        new(): b2DistanceJointDef
    }

    interface b2RevoluteJoint {
        GetType(): number;
        EnableMotor(arg0: boolean);
        new(): b2RevoluteJoint;
    }

    interface b2RevoluteJointDef extends b2JointDef {
        set_bodyA(body1: any);
        set_bodyB(body2: any);
        set_localAnchorA(arg0: b2Vec2);
        set_localAnchorB(arg0: b2Vec2);
        set_collideConnected(arg0: boolean);
        set_enableLimit(arg0: boolean);
        set_lowerAngle(arg0: number);
        set_upperAngle(arg0: number);
        set_motorSpeed(arg0: number);
        Initialize(ab: b2Body, body: b2Body, arg2: b2Vec2);
        new(): b2RevoluteJointDef;
    }

    interface b2_staticBody { }

    interface b2_dynamicBody { }

    interface b2_kinematicBody { }

    interface b2JointDef {
        set_localAnchorA(pos: b2Vec2);
        set_localAnchorB(pos: b2Vec2);
        set_bodyA(body: b2Body);
        set_bodyB(body: b2Body);
    }

    interface b2World {
        SetAllowSleeping(arg0: boolean);
        DestroyBody(body: b2Body);
        SetContactListener(listener: JSContactListener);
        CreateJoint(rjd: b2JointDef);
        new(gravity: b2Vec2): b2World;

        Step(frameTime: number, velocityIterations: number, positionIterations: number);
        CreateBody(bd: b2BodyDef): b2Body;
    }

    interface b2BodyDef {
        set_fixedRotation(arg0: boolean);
        set_userData(arg0: string);
        set_angle(angle: any);
        new(): b2BodyDef;
        set_position(arg0: b2Vec2);
        set_type(b2_dynamicBody: any);
    }

    interface b2RopeJointDef extends b2JointDef {
        set_maxLength(length: any);
        new():b2RopeJointDef;
    }

    interface b2Shape {

    }

    interface b2PolygonShape extends b2Shape {
        Set(ptr_wrapped: any, length: any);
        GetVertex(i: number): b2Vec2;
        GetVertexCount(): number;
        new(): b2PolygonShape;
        SetAsBox(width: number, height: number, origin?: b2Vec2, angle?: number);
    }

    interface b2CircleShape extends b2Shape {
        m_radius: number;
        new(): b2CircleShape;
        set_m_radius(r: number);
    }

    interface b2Body {
        ApplyForce(force: b2Vec2);
        SetTransform(position: b2Vec2, angle: number);
        _body: any;
        GetLinearVelocity();
        SetLinearVelocity(arg0: b2Vec2);
        SetUserData(arg0: any);
        SetAngularVelocity(arg0: number);
        new(): b2Body;
        GetAngle(): number;
        GetPosition(): b2Vec2;
        CreateFixture(shape: any, arg1: number): b2Fixture
        CreateFixture(fd: b2FixtureDef): b2Fixture
    }

    interface b2Fixture {
        GetBody();
        _parent: any; // hacky shit time wo0o0o0oo0
        SetUserData(data: any);
        SetRestitution(restitution: number);
        new(): b2Fixture;
    }

    interface b2FixtureDef {
        new(): b2FixtureDef;
        set_userData(data: any);
        set_restitution(r: number);
        set_density(d: number);
        set_friction(f: number);
        set_shape(shape: b2Shape)
    }

    interface b2Vec2 {
        set_y(y: any);
        set_x(walkSpeed: number);
        op_mul(scale: number);
        op_sub(pos: b2Vec2);
        Normalize(): b2Vec2;
        new(x?: number, y?: number): b2Vec2;
        x: number;
        y: number;
    }
}

export = Box2D;